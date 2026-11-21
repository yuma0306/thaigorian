'use client';

import { NoteIcon } from '@/components/Icon/NoteIcon';
import { useModal } from '@/components/Modal/useModal';
import { PhraseNoteModal } from '@/components/PhraseNoteModal/PhraseNoteModal';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import { useWatch, type Control, useFormContext } from 'react-hook-form';
import styles from './PhraseNoteButton.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
};

export function PhraseNoteButton({ control, phraseIndex }: Props) {
	const { closeModal, openModal } = useModal();
	const notePath = `phrases.${phraseIndex}.note` as const;
	const note = useWatch({ control, name: notePath }) ?? '';
	const { setValue } = useFormContext<CategoryRegisterFormValues>();
	const hasNote = Boolean(note.trim());

	return (
		<button
			className={styles.button}
			type="button"
			data-has-note={hasNote}
			onClick={() =>
				openModal(
					<PhraseNoteModal
						initialNote={note}
						onClose={closeModal}
						onSave={(nextNote) => {
							setValue(notePath, nextNote, { shouldDirty: true });
							closeModal();
						}}
					/>
				)
			}
			aria-label={hasNote ? 'Edit note' : 'Add note'}
		>
			<NoteIcon />
		</button>
	);
}
