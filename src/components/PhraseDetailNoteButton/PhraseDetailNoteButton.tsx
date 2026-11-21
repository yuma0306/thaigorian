'use client';

import { NoteIcon } from '@/components/Icon/NoteIcon';
import { useModal } from '@/components/Modal/useModal';
import { PhraseNoteViewModal } from '@/components/PhraseNoteViewModal/PhraseNoteViewModal';
import styles from './PhraseDetailNoteButton.module.css';

type Props = {
	note: string;
};

export function PhraseDetailNoteButton({ note }: Props) {
	const { closeModal, openModal } = useModal();

	return (
		<button
			className={styles.button}
			type="button"
			onClick={() => openModal(<PhraseNoteViewModal note={note} onClose={closeModal} />)}
			aria-label="View note"
		>
			<NoteIcon />
		</button>
	);
}