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
				aria-label={`用語${wordIndex + 1}の操作を開く`}
			>
				⋮
			</button>
			{openMenu?.type === 'word' && openMenu.id === wordId && (
				<FieldMenu
					align="end"
					addAboveLabel="上に用語を追加"
					addBelowLabel="下に用語を追加"
					moveUpLabel="1つ上に移動"
					moveDownLabel="1つ下に移動"
					deleteLabel="用語を削除"
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
