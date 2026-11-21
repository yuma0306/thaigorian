'use client';

import { useId } from 'react';
import styles from './PhraseNoteViewModal.module.css';

type Props = {
	note: string;
	onClose: () => void;
};

export function PhraseNoteViewModal({ note, onClose }: Props) {
	const titleId = useId();

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
				<p className={styles.body}>{note}</p>
				<div className={styles.actions}>
					<button className={styles.closeButton} type="button" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}