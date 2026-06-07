import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCategoryConfirmModal } from '@/components/Modal/deleteCategoryConfirmModal';
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
	const { openModal } = useModal();
	const { showToast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);

	function handleDeleteClick() {
		if (!categoryId || !onDelete || isDeleting) return;
		openModal(
			deleteCategoryConfirmModal(() => {
				void handleDelete();
			})
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
			showToast('削除に失敗しました。', 'error');
			setIsDeleting(false);
		}
	}

	return { isDeleting, handleDeleteClick };
}
