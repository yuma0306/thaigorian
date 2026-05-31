import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';
import { WordFieldCard } from '@/components/WordFieldCard/WordFieldCard';
import type { MenuState, PhraseField, WordField } from '@/types/myCategoryRegister';
import type { MouseEvent } from 'react';

type Props = {
	phrase: PhraseField;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onUpdatePhrase: (
		phraseId: string,
		key: keyof Omit<PhraseField, 'id' | 'words'>,
		value: string
	) => void;
	onAddWord: (phraseId: string) => void;
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

export function PhraseFieldCardBody({
	phrase,
	openMenu,
	onToggleMenu,
	onUpdatePhrase,
	onAddWord,
	onInsertWord,
	onMoveWord,
	onRemoveWord,
	onUpdateWord
}: Props) {
	return (
		<div className={styles.detailsContent}>
			<CategoryTextField
				id={`phrase-${phrase.id}`}
				label="フレーズ"
				value={phrase.phrase}
				onChange={(value) => onUpdatePhrase(phrase.id, 'phrase', value)}
			/>
			<CategoryTextField
				id={`meaning-${phrase.id}`}
				label="意味"
				value={phrase.meaning}
				onChange={(value) => onUpdatePhrase(phrase.id, 'meaning', value)}
			/>

			<section className={styles.wordsSection}>
				<div className={styles.sectionTitle}>
					<h2>用語</h2>
				</div>

				{phrase.words.length > 0 && (
					<div className={styles.wordList}>
						{phrase.words.map((word, wordIndex) => (
							<WordFieldCard
								key={word.id}
								phraseId={phrase.id}
								word={word}
								wordIndex={wordIndex}
								wordCount={phrase.words.length}
								openMenu={openMenu}
								onToggleMenu={onToggleMenu}
								onInsertWord={onInsertWord}
								onMoveWord={onMoveWord}
								onRemoveWord={onRemoveWord}
								onUpdateWord={onUpdateWord}
							/>
						))}
					</div>
				)}

				<button
					className={styles.wordTimelineAddButton}
					type="button"
					onClick={() => onAddWord(phrase.id)}
					aria-label="用語のフィールドを追加"
				>
					<span aria-hidden="true">＋</span>
				</button>
			</section>
		</div>
	);
}
