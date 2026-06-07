import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { PhraseFieldCardBody } from '@/components/PhraseFieldCardBody/PhraseFieldCardBody';
import { PhraseFieldCardMenu } from '@/components/PhraseFieldCardMenu/PhraseFieldCardMenu';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import styles from './PhraseFieldCard.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	phraseId: string;
	phraseCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (index: number) => void;
	onCloseMenu: () => void;
};

export function PhraseFieldCard({
	control,
	phraseIndex,
	phraseId,
	phraseCount,
	openMenu,
	onToggleMenu,
	onInsertPhrase,
	onMovePhrase,
	onRemovePhrase,
	onCloseMenu
}: Props) {
	return (
		<article className={styles.phraseCard}>
			<details className={styles.cardBody} open>
				<summary className={styles.summary}>
					<span className={styles.visuallyHidden}>開く・閉じる</span>
					<PhraseFieldCardMenu
						phraseId={phraseId}
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
					control={control}
					phraseIndex={phraseIndex}
					phraseId={phraseId}
					openMenu={openMenu}
					onToggleMenu={onToggleMenu}
					onCloseMenu={onCloseMenu}
				/>
			</details>
		</article>
	);
}
