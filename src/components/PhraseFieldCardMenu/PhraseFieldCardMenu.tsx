import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { FieldMenu } from '@/components/FieldMenu/FieldMenu';
import { PhraseNoteButton } from '@/components/PhraseNoteButton/PhraseNoteButton';
import { maxPhrasesPerCategory } from '@/constants/myCategoryLimits';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import styles from './PhraseFieldCardMenu.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseId: string;
	phraseIndex: number;
	phraseCount: number;
	openMenu: MenuState;
	onToggleMenu: (
		event: MouseEvent<HTMLButtonElement>,
		menu: { type: 'phrase'; id: string }
	) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (index: number) => void;
};

export function PhraseFieldCardMenu({
	control,
	phraseId,
	phraseIndex,
	phraseCount,
	openMenu,
	onToggleMenu,
	onInsertPhrase,
	onMovePhrase,
	onRemovePhrase
}: Props) {
	return (
		<div className={styles.menuWrapper}>
			<PhraseNoteButton control={control} phraseIndex={phraseIndex} />
			<button
				className={styles.menuButton}
				type="button"
				onClick={(event) => onToggleMenu(event, { type: 'phrase', id: phraseId })}
				aria-label={`Open actions for phrase ${phraseIndex + 1}`}
			>
				⋮
			</button>
			{openMenu?.type === 'phrase' && openMenu.id === phraseId && (
				<FieldMenu
					align="end"
					addAboveLabel="Add field above"
					addBelowLabel="Add field below"
					moveUpLabel="Move up"
					moveDownLabel="Move down"
					deleteLabel="Delete field"
					isMoveUpDisabled={phraseIndex === 0}
					isMoveDownDisabled={phraseIndex === phraseCount - 1}
					isAddDisabled={phraseCount >= maxPhrasesPerCategory}
					onAddAbove={() => onInsertPhrase(phraseIndex)}
					onAddBelow={() => onInsertPhrase(phraseIndex + 1)}
					onMoveUp={() => onMovePhrase(phraseIndex, phraseIndex - 1)}
					onMoveDown={() => onMovePhrase(phraseIndex, phraseIndex + 1)}
					onDelete={() => onRemovePhrase(phraseIndex)}
				/>
			)}
		</div>
	);
}
