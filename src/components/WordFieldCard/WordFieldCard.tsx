import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { FieldMenu } from '@/components/FieldMenu/FieldMenu';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import styles from './WordFieldCard.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	wordIndex: number;
	wordId: string;
	wordCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertWord: (index: number) => void;
	onMoveWord: (fromIndex: number, toIndex: number) => void;
	onRemoveWord: (index: number) => void;
};

export function WordFieldCard({
	control,
	phraseIndex,
	wordIndex,
	wordId,
	wordCount,
	openMenu,
	onToggleMenu,
	onInsertWord,
	onMoveWord,
	onRemoveWord
}: Props) {
	return (
		<article className={styles.wordCard}>
			<details className={styles.cardBody} open>
				<summary className={styles.summary}>
					<span className={styles.visuallyHidden}>開く・閉じる</span>
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
				</summary>
				<div className={styles.detailsContent}>
					<CategoryTextField
						id={`word-${wordId}`}
						label="用語"
						name={`phrases.${phraseIndex}.words.${wordIndex}.word`}
						control={control}
					/>
					<CategoryTextField
						id={`word-meaning-${wordId}`}
						label="意味"
						name={`phrases.${phraseIndex}.words.${wordIndex}.meaning`}
						control={control}
					/>
				</div>
			</details>
		</article>
	);
}
