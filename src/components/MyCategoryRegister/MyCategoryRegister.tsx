'use client';

import { CategoryDeleteButton } from '@/components/CategoryDeleteButton/CategoryDeleteButton';
import { CategoryRegisterActions } from '@/components/CategoryRegisterActions/CategoryRegisterActions';
import { CategorySpeechLangSelect } from '@/components/CategorySpeechLangSelect/CategorySpeechLangSelect';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { PairPageLink } from '@/components/PairPageLink/PairPageLink';
import { PhraseRepeaterSection } from '@/components/PhraseRepeaterSection/PhraseRepeaterSection';
import { Stack } from '@/components/Stack/Stack';
import { defaultSpeechLang } from '@/constants/speechLangs';
import { paths } from '@/constants/paths';
import { useCategoryRegisterForm } from '@/hooks/useCategoryRegisterForm';
import { createId } from './fieldFactory';
import type { MyCategoryRegisterProps } from './types';

function createRegisterFormOptions({
	categoryId,
	initialPhrases = [],
	initialTitle = '',
	initialContentId,
	initialSpeechLang = defaultSpeechLang,
	onDelete,
	onSave
}: MyCategoryRegisterProps) {
	return {
		initialContentId: initialContentId ?? `category-${createId()}`,
		initialTitle,
		initialSpeechLang,
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
		<Stack size={2} variant="div">
			<Crumbs items={crumbItems} />
			<Inner>
				<Stack variant="div" size={3}>
					{categoryId && (
						<PairPageLink href={paths.myPhrase(categoryId)}>マイフレーズを見る</PairPageLink>
					)}
					<form onSubmit={(event) => event.preventDefault()}>
						<Stack variant="div" size={2}>
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
							<CategorySpeechLangSelect control={control} />
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
				</Stack>
			</Inner>
		</Stack>
	);
}
