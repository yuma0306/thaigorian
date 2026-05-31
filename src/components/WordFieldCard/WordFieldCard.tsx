import type { MouseEvent } from 'react';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { FieldMenu } from '@/components/FieldMenu/FieldMenu';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';
import type { MenuState, WordField } from '@/types/myCategoryRegister';

type Props = {
	phraseId: string;
	word: WordField;
	wordIndex: number;
	wordCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertWord: (phraseId: string, index: number) => void;
	onMoveWord: (phraseId: string, fromIndex: number, toIndex: number) => void;
	onRemoveWord: (phraseId: string, wordId: string) => void;
	onUpdateWord: (
		phraseId: string,
		wordId: string,
		key: keyof Omit<WordField, 'id'>,
		value: string
	) => void;
};

export function WordFieldCard({
	phraseId,
	word,
	wordIndex,
	wordCount,
	openMenu,
	onToggleMenu,
	onInsertWord,
	onMoveWord,
	onRemoveWord,
	onUpdateWord
}: Props) {
	return (
		<article className={styles.wordCard}>
			<div className={styles.timeline}>
				<span className={styles.number}>{wordIndex + 1}</span>
			</div>
			<details className={styles.cardBody} open>
				<summary className={styles.groupLabel}>
					<span className={styles.visuallyHidden}>開く・閉じる</span>
					<div className={styles.menuWrapper}>
						<button
							className={styles.menuButton}
							type="button"
							onClick={(event) => onToggleMenu(event, { type: 'word', id: word.id })}
							aria-label={`用語${wordIndex + 1}の操作を開く`}
						>
							⋮
						</button>
						{openMenu?.type === 'word' && openMenu.id === word.id && (
							<FieldMenu
								addAboveLabel="上に用語を追加"
								addBelowLabel="下に用語を追加"
								moveUpLabel="1つ上に移動"
								moveDownLabel="1つ下に移動"
								deleteLabel="用語を削除"
								isMoveUpDisabled={wordIndex === 0}
								isMoveDownDisabled={wordIndex === wordCount - 1}
								onAddAbove={() => onInsertWord(phraseId, wordIndex)}
								onAddBelow={() => onInsertWord(phraseId, wordIndex + 1)}
								onMoveUp={() => onMoveWord(phraseId, wordIndex, wordIndex - 1)}
								onMoveDown={() => onMoveWord(phraseId, wordIndex, wordIndex + 1)}
								onDelete={() => onRemoveWord(phraseId, word.id)}
							/>
						)}
					</div>
				</summary>
				<div className={styles.detailsContent}>
					<CategoryTextField
						id={`word-${word.id}`}
						label="用語"
						value={word.word}
						onChange={(value) => onUpdateWord(phraseId, word.id, 'word', value)}
					/>
					<CategoryTextField
						id={`word-meaning-${word.id}`}
						label="意味"
						value={word.meaning}
						onChange={(value) => onUpdateWord(phraseId, word.id, 'meaning', value)}
					/>
				</div>
			</details>
		</article>
	);
}
