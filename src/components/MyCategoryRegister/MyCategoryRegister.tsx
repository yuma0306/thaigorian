'use client';

import { useState } from 'react';
import { CategoryRegisterActions } from '@/components/CategoryRegisterActions/CategoryRegisterActions';
import { Inner } from '@/components/Inner/Inner';
import { PhraseRepeaterSection } from '@/components/PhraseRepeaterSection/PhraseRepeaterSection';
import { createId } from './fieldFactory';
import { useCategoryPersist } from './useCategoryPersist';
import { usePhraseFields } from './usePhraseFields';
import type { MyCategoryRegisterProps } from './types';
import { InputText } from '@/components/InputText/InputText';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';

export function MyCategoryRegister({
	categoryId,
	initialPhrases = [],
	initialTitle = '',
	initialContentId,
	onDelete,
	onSave,
	saveLabel = '保存する'
}: MyCategoryRegisterProps) {
	const [title, setTitle] = useState(initialTitle);
	const [contentId] = useState(() => initialContentId ?? `category-${createId()}`);

	const phraseFields = usePhraseFields(initialPhrases);
	const persist = useCategoryPersist({
		contentId,
		title,
		phrases: phraseFields.phrases,
		onSave,
		...(categoryId !== undefined ? { categoryId } : {}),
		...(onDelete !== undefined ? { onDelete } : {})
	});

	return (
		<Inner>
			<form onSubmit={persist.handleSubmit}>
				<Stack variant="div" size={1}>
					<label htmlFor="category-title">
						<Typography size={4} variant="span" color="primary" weight="bold" align="left">
							タイトル
						</Typography>
					</label>
					<InputText
						id="category-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						isCorrect={false}
					/>
				</Stack>
				<PhraseRepeaterSection
					phrases={phraseFields.phrases}
					openMenu={phraseFields.openMenu}
					onAddPhrase={phraseFields.handleAddPhrase}
					onToggleMenu={phraseFields.handleToggleMenu}
					onInsertPhrase={phraseFields.handleInsertPhrase}
					onMovePhrase={phraseFields.handleMovePhrase}
					onRemovePhrase={phraseFields.handleRemovePhrase}
					onUpdatePhrase={phraseFields.handleUpdatePhrase}
					onAddWord={phraseFields.handleAddWord}
					onInsertWord={phraseFields.handleInsertWord}
					onMoveWord={phraseFields.handleMoveWord}
					onRemoveWord={phraseFields.handleRemoveWord}
					onUpdateWord={phraseFields.handleUpdateWord}
				/>
				<CategoryRegisterActions
					saveLabel={saveLabel}
					isSaving={persist.isSaving}
					isDeleting={persist.isDeleting}
					message={persist.message}
					{...(categoryId !== undefined && { categoryId })}
					{...(onDelete !== undefined ? { onDeleteClick: persist.handleDeleteClick } : {})}
				/>
			</form>
		</Inner>
	);
}
