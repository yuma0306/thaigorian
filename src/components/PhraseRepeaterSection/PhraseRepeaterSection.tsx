import type { MouseEvent } from 'react';

import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';
import { PhraseFieldCard } from '@/components/PhraseFieldCard/PhraseFieldCard';
import type { MenuState, PhraseField, WordField } from '@/types/myCategoryRegister';

type Props = {
	phrases: PhraseField[];
	openMenu: MenuState;
	onAddPhrase: () => void;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (phraseId: string) => void;
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

export function PhraseRepeaterSection({
	phrases,
	openMenu,
	onAddPhrase,
	onToggleMenu,
	onInsertPhrase,
	onMovePhrase,
	onRemovePhrase,
	onUpdatePhrase,
	onAddWord,
	onInsertWord,
	onMoveWord,
	onRemoveWord,
	onUpdateWord
}: Props) {
	return (
		<section className={styles.repeaterSection}>
			<div className={styles.sectionTitle}>
				<h1>フレーズ集</h1>
			</div>

			{phrases.length === 0 ? (
				<button
					className={styles.timelineAddButton}
					type="button"
					onClick={onAddPhrase}
					aria-label="フィールドを追加"
				>
					<span aria-hidden="true">＋</span>
				</button>
			) : (
				<div className={styles.repeaterList}>
					{phrases.map((phrase, phraseIndex) => (
						<PhraseFieldCard
							key={phrase.id}
							phrase={phrase}
							phraseIndex={phraseIndex}
							phraseCount={phrases.length}
							openMenu={openMenu}
							onToggleMenu={onToggleMenu}
							onInsertPhrase={onInsertPhrase}
							onMovePhrase={onMovePhrase}
							onRemovePhrase={onRemovePhrase}
							onUpdatePhrase={onUpdatePhrase}
							onAddWord={onAddWord}
							onInsertWord={onInsertWord}
							onMoveWord={onMoveWord}
							onRemoveWord={onRemoveWord}
							onUpdateWord={onUpdateWord}
						/>
					))}
					<button
						className={styles.timelineAddButton}
						type="button"
						onClick={onAddPhrase}
						aria-label="フィールドを追加"
					>
						<span aria-hidden="true">＋</span>
					</button>
				</div>
			)}
		</section>
	);
}
