import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { paths } from '@/constants/paths';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';
import { toSavePayload } from './toSavePayload';
import type { PhraseField } from '@/types/myCategoryRegister';

type Params = {
	categoryId?: string | undefined;
	contentId: string;
	title: string;
	phrases: PhraseField[];
	onSave: (payload: SaveMyCategoryPayload) => Promise<SaveMyCategoryResult>;
	onDelete?: ((categoryId: string) => Promise<SaveMyCategoryResult>) | undefined;
};

export function useCategoryPersist({
	categoryId,
	contentId,
	title,
	phrases,
	onSave,
	onDelete
}: Params) {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage('');
		setIsSaving(true);

		try {
			const result = await onSave(toSavePayload(contentId, title, phrases));

			if (!result.ok) {
				setMessage(result.message);
				setIsSaving(false);
				return;
			}

			setMessage('保存しました。');
			setIsSaving(false);
			router.push(paths.memberPhrases);
		} catch {
			setMessage('保存に失敗しました。');
			setIsSaving(false);
		}
	}

	async function handleDelete() {
		if (!categoryId || !onDelete || isDeleting) {
			return;
		}

		setMessage('');
		setIsDeleting(true);

		try {
			const result = await onDelete(categoryId);

			if (!result.ok) {
				setMessage(result.message);
				setIsDeleting(false);
				return;
			}

			router.push(paths.memberPhrases);
		} catch {
			setMessage('削除に失敗しました。');
			setIsDeleting(false);
		}
	}

	return {
		isSaving,
		isDeleting,
		message,
		handleSubmit,
		handleDelete
	};
}
