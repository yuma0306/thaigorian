import type { MouseEvent } from 'react';
import { FieldMenu } from '@/components/FieldMenu/FieldMenu';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';
import type { MenuState } from '@/types/myCategoryRegister';

type Props = {
	phraseId: string;
	phraseIndex: number;
	phraseCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: { type: 'phrase'; id: string }) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (phraseId: string) => void;
};

export function PhraseFieldCardMenu({
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
			<button
				className={styles.menuButton}
				type="button"
				onClick={(event) => onToggleMenu(event, { type: 'phrase', id: phraseId })}
				aria-label={`フレーズ${phraseIndex + 1}の操作を開く`}
			>
				⋮
			</button>
			{openMenu?.type === 'phrase' && openMenu.id === phraseId && (
				<FieldMenu
					addAboveLabel="上にフィールドを追加"
					addBelowLabel="下にフィールドを追加"
					moveUpLabel="1つ上に移動"
					moveDownLabel="1つ下に移動"
					deleteLabel="フィールドを削除"
					isMoveUpDisabled={phraseIndex === 0}
					isMoveDownDisabled={phraseIndex === phraseCount - 1}
					onAddAbove={() => onInsertPhrase(phraseIndex)}
					onAddBelow={() => onInsertPhrase(phraseIndex + 1)}
					onMoveUp={() => onMovePhrase(phraseIndex, phraseIndex - 1)}
					onMoveDown={() => onMovePhrase(phraseIndex, phraseIndex + 1)}
					onDelete={() => onRemovePhrase(phraseId)}
				/>
			)}
		</div>
	);
}
