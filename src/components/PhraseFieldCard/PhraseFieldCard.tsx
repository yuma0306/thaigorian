import type { MouseEvent } from 'react';

import { PhraseFieldCardBody } from '@/components/PhraseFieldCardBody/PhraseFieldCardBody';
import { PhraseFieldCardMenu } from '@/components/PhraseFieldCardMenu/PhraseFieldCardMenu';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';
import type { MenuState, PhraseField, WordField } from '@/types/myCategoryRegister';

type Props = {
	phrase: PhraseField;
	phraseIndex: number;
	phraseCount: number;
	openMenu: MenuState;
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

export function PhraseFieldCard({
	phrase,
	phraseIndex,
	phraseCount,
	openMenu,
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
		<article className={styles.phraseCard}>
			<div className={styles.timeline}>
				<span className={styles.number}>{phraseIndex + 1}</span>
			</div>
			<details className={styles.cardBody} open>
				<summary className={styles.groupLabel}>
					<span className={styles.visuallyHidden}>開く・閉じる</span>
					<PhraseFieldCardMenu
						phraseId={phrase.id}
						phraseIndex={phraseIndex}
						phraseCount={phraseCount}
						openMenu={openMenu}
						onToggleMenu={onToggleMenu}
						onInsertPhrase={onInsertPhrase}
						onMovePhrase={onMovePhrase}
						onRemovePhrase={onRemovePhrase}
					/>
				</summary>
				<PhraseFieldCardBody
					phrase={phrase}
					openMenu={openMenu}
					onToggleMenu={onToggleMenu}
					onUpdatePhrase={onUpdatePhrase}
					onAddWord={onAddWord}
					onInsertWord={onInsertWord}
					onMoveWord={onMoveWord}
					onRemoveWord={onRemoveWord}
					onUpdateWord={onUpdateWord}
				/>
			</details>
		</article>
	);
}
