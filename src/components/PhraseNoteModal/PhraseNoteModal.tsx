'use client';

import { useId, useState } from 'react';
import { maxPhraseNoteLength } from '@/constants/myCategoryLimits';
import styles from './PhraseNoteModal.module.css';

type Props = {
	initialNote: string;
	onClose: () => void;
	onSave: (note: string) => void;
};

export function PhraseNoteModal({ initialNote, onClose, onSave }: Props) {
	const titleId = useId();
	const [draft, setDraft] = useState(initialNote);

	function handleSave() {
		onSave(draft.trim());
	}

	return (
		<div className={styles.overlay} role="presentation" onClick={onClose}>
			<div
				aria-labelledby={titleId}
				aria-modal="true"
				className={styles.dialog}
				role="dialog"
				onClick={(event) => event.stopPropagation()}
			>
				<p className={styles.title} id={titleId}>
					Note
				</p>
				<textarea
					className={styles.textarea}
					maxLength={maxPhraseNoteLength}
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					placeholder="Write a note for this phrase"
				/>
				<div className={styles.actions}>
					<button className={styles.cancelButton} type="button" onClick={onClose}>
						Cancel
					</button>
					<button className={styles.saveButton} type="button" onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}