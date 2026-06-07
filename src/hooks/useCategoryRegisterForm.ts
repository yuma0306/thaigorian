import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { paths } from '@/constants/paths';
import { useCategoryDelete } from '@/hooks/useCategoryDelete';
import { useFieldMenu } from '@/hooks/useFieldMenu';
import { usePhraseFieldArray } from '@/hooks/usePhraseFieldArray';
import { useToast } from '@/hooks/useToast';
import {
	categoryRegisterFormSchema,
	toSaveMyCategoryPayload,
	type CategoryRegisterFormValues
} from '@/schemas/myCategory';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';

type Params = {
	categoryId?: string;
	initialContentId: string;
	initialTitle: string;
	initialPhrases: CategoryRegisterFormValues['phrases'];
	onSave: (payload: SaveMyCategoryPayload) => Promise<SaveMyCategoryResult>;
	onDelete?: (categoryId: string) => Promise<SaveMyCategoryResult>;
};

export function useCategoryRegisterForm({
	categoryId,
	initialContentId,
	initialTitle,
	initialPhrases,
	onSave,
	onDelete
}: Params) {
	const router = useRouter();
	const { showToast } = useToast();
	const { openMenu, handleToggleMenu, handleCloseMenu } = useFieldMenu();

	const form = useForm<CategoryRegisterFormValues>({
		resolver: zodResolver(categoryRegisterFormSchema),
		defaultValues: {
			contentId: initialContentId,
			title: initialTitle,
			phrases: initialPhrases
		}
	});

	const phraseActions = usePhraseFieldArray({ control: form.control, onCloseMenu: handleCloseMenu });

	const deleteActions = useCategoryDelete({
		...(categoryId !== undefined ? { categoryId } : {}),
		...(onDelete !== undefined ? { onDelete } : {})
	});

	const isSaving = form.formState.isSubmitting;

	async function handleSave(values: CategoryRegisterFormValues) {
		try {
			const result = await onSave(toSaveMyCategoryPayload(values));
			if (!result.ok) {
				showToast(result.message, 'error');
				return;
			}

			showToast('保存しました。');
			if (!categoryId) {
				router.push(paths.memberPhrases);
			}
		} catch {
			showToast('保存に失敗しました。', 'error');
		}
	}

	return {
		form,
		phraseFields: phraseActions.phraseFields,
		openMenu,
		isSaving,
		isDeleting: deleteActions.isDeleting,
		handleToggleMenu,
		handleAddPhrase: phraseActions.handleAddPhrase,
		handleInsertPhrase: phraseActions.handleInsertPhrase,
		handleRemovePhrase: phraseActions.handleRemovePhrase,
		handleMovePhrase: phraseActions.handleMovePhrase,
		handleSave: form.handleSubmit(handleSave),
		handleDeleteClick: deleteActions.handleDeleteClick,
		handleCloseMenu
	};
}
