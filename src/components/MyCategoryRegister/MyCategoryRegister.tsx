'use client';

import { CategoryDeleteButton } from '@/components/CategoryDeleteButton/CategoryDeleteButton';
import { CategoryRegisterActions } from '@/components/CategoryRegisterActions/CategoryRegisterActions';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { PhraseRepeaterSection } from '@/components/PhraseRepeaterSection/PhraseRepeaterSection';
import { Stack } from '@/components/Stack/Stack';
import { paths } from '@/constants/paths';
import { useCategoryRegisterForm } from '@/hooks/useCategoryRegisterForm';
import { createId } from './fieldFactory';
import type { MyCategoryRegisterProps } from './types';

function createRegisterFormOptions({
	categoryId,
	initialPhrases = [],
	initialTitle = '',
	initialContentId,
	onDelete,
	onSave
}: MyCategoryRegisterProps) {
	return {
		initialContentId: initialContentId ?? `category-${createId()}`,
		initialTitle,
		initialPhrases,
		onSave,
		...(categoryId !== undefined ? { categoryId } : {}),
		...(onDelete !== undefined ? { onDelete } : {})
	};
}

export function MyCategoryRegister(props: MyCategoryRegisterProps) {
	const { categoryId, initialTitle = '', onDelete, saveLabel = '保存する' } = props;
	const registerForm = useCategoryRegisterForm(createRegisterFormOptions(props));
	const { control } = registerForm.form;
	const crumbItems = categoryId
		? [
				{ text: 'マイページ', href: paths.member },
				{ text: 'フレーズ一覧', href: paths.memberPhrases },
				{ text: initialTitle, href: paths.memberPhrasesDetail(categoryId) }
			]
		: [
				{ text: 'マイページ', href: paths.member },
				{ text: 'フレーズ一覧', href: paths.memberPhrases },
				{ text: 'フレーズ登録', href: paths.memberPhrasesRegister }
			];

	return (
		<Stack size={3} variant="div">
			<Crumbs items={crumbItems} />
			<Inner>
				<form onSubmit={(event) => event.preventDefault()}>
					<Stack variant="div" size={3}>
						<CategoryTextField
							id="category-title"
							label="タイトル"
							name="title"
							control={control}
							labelAction={
								categoryId && onDelete ? (
									<CategoryDeleteButton
										isDeleting={registerForm.isDeleting}
										isSaving={registerForm.isSaving}
										onClick={registerForm.handleDeleteClick}
									/>
								) : undefined
							}
						/>
						<PhraseRepeaterSection
							control={control}
							phraseFields={registerForm.phraseFields}
							openMenu={registerForm.openMenu}
							onAddPhrase={registerForm.handleAddPhrase}
							onToggleMenu={registerForm.handleToggleMenu}
							onInsertPhrase={registerForm.handleInsertPhrase}
							onMovePhrase={registerForm.handleMovePhrase}
							onRemovePhrase={registerForm.handleRemovePhrase}
							onCloseMenu={registerForm.handleCloseMenu}
						/>
						<CategoryRegisterActions
							saveLabel={saveLabel}
							isSaving={registerForm.isSaving}
							onSaveClick={() => {
								void registerForm.handleSave();
							}}
						/>
					</Stack>
				</form>
			</Inner>
		</Stack>
	);
}
