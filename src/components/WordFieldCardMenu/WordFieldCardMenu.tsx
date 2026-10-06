import type { MouseEvent } from 'react';
import { FieldMenu } from '@/components/FieldMenu/FieldMenu';
import type { MenuState } from '@/types/myCategoryRegister';
import styles from './WordFieldCardMenu.module.css';

type Props = {
	wordId: string;
	wordIndex: number;
	wordCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: { type: 'word'; id: string }) => void;
	onInsertWord: (index: number) => void;
	onMoveWord: (fromIndex: number, toIndex: number) => void;
	onRemoveWord: (index: number) => void;
};

export function WordFieldCardMenu({
	wordId,
	wordIndex,
	wordCount,
	openMenu,
	onToggleMenu,
	onInsertWord,
	onMoveWord,
	onRemoveWord
}: Props) {
	return (
		<div className={styles.menuWrapper}>
			<button
				className={styles.menuButton}
				type="button"
				onClick={(event) => onToggleMenu(event, { type: 'word', id: wordId })}
				aria-label={`Open actions for term ${wordIndex + 1}`}
			>
				⋮
			</button>
			{openMenu?.type === 'word' && openMenu.id === wordId && (
				<FieldMenu
					align="end"
					addAboveLabel="Add term above"
					addBelowLabel="Add term below"
					moveUpLabel="Move up"
					moveDownLabel="Move down"
					deleteLabel="Delete term"
					isMoveUpDisabled={wordIndex === 0}
					isMoveDownDisabled={wordIndex === wordCount - 1}
					onAddAbove={() => onInsertWord(wordIndex)}
					onAddBelow={() => onInsertWord(wordIndex + 1)}
					onMoveUp={() => onMoveWord(wordIndex, wordIndex - 1)}
					onMoveDown={() => onMoveWord(wordIndex, wordIndex + 1)}
					onDelete={() => onRemoveWord(wordIndex)}
				/>
			)}
		</div>
	);
}
