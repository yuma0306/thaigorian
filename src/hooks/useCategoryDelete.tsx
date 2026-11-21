'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { useModal } from '@/components/Modal/useModal';
import { paths } from '@/constants/paths';
import { useToast } from '@/hooks/useToast';
import type { SaveMyCategoryResult } from '@/types/myCategory';

type Params = {
	categoryId?: string;
	onDelete?: (categoryId: string) => Promise<SaveMyCategoryResult>;
};

export function useCategoryDelete({ categoryId, onDelete }: Params) {
	const router = useRouter();
	const { closeModal, openModal } = useModal();
	const { showToast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);

	function handleDeleteClick() {
		if (!categoryId || !onDelete || isDeleting) return;
		openModal(
			<Modal
				title="Delete collection?"
				description="This phrase collection will be deleted. Continue?"
				agreeLabel="Delete"
				disagreeLabel="Cancel"
				onAgree={() => {
					closeModal();
					void handleDelete();
				}}
				onDisagree={closeModal}
			/>
		);
	}

	async function handleDelete() {
		if (!categoryId || !onDelete || isDeleting) {
			return;
		}

		setIsDeleting(true);

		try {
			const result = await onDelete(categoryId);
			if (!result.ok) {
				showToast(result.message, 'error');
				setIsDeleting(false);
				return;
			}

			router.push(paths.memberPhrases);
		} catch {
			showToast('Could not delete.', 'error');
			setIsDeleting(false);
		}
	}

	return { isDeleting, handleDeleteClick };
}