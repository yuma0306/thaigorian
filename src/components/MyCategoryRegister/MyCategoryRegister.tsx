'use client';

import { useState } from 'react';
import { CategoryRegisterActions } from '@/components/CategoryRegisterActions/CategoryRegisterActions';
import { CategoryTitleField } from '@/components/CategoryTitleField/CategoryTitleField';
import { Inner } from '@/components/Inner/Inner';
import { PhraseRepeaterSection } from '@/components/PhraseRepeaterSection/PhraseRepeaterSection';
import { createId } from './fieldFactory';
import { useCategoryPersist } from './useCategoryPersist';
import { usePhraseFields } from './usePhraseFields';
import type { MyCategoryRegisterProps } from './types';
import styles from './MyCategoryRegister.module.css';

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
			<section className={styles.page}>
				<form className={styles.form} onSubmit={persist.handleSubmit}>
					<CategoryTitleField value={title} onChange={setTitle} />

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
						{...(onDelete !== undefined ? { onDelete: persist.handleDelete } : {})}
					/>
				</form>
			</section>
		</Inner>
	);
}
