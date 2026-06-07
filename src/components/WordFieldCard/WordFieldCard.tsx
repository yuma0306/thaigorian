import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { WordFieldCardMenu } from '@/components/WordFieldCardMenu/WordFieldCardMenu';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Stack } from '../Stack/Stack';
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
			<Stack variant="div" size={2}>
				<CategoryTextField
					id={`word-${wordId}`}
					label="用語"
					name={`phrases.${phraseIndex}.words.${wordIndex}.word`}
					control={control}
					labelAction={
						<WordFieldCardMenu
							wordId={wordId}
							wordIndex={wordIndex}
							wordCount={wordCount}
							openMenu={openMenu}
							onToggleMenu={onToggleMenu}
							onInsertWord={onInsertWord}
							onMoveWord={onMoveWord}
							onRemoveWord={onRemoveWord}
						/>
					}
				/>
				<CategoryTextField
					id={`word-meaning-${wordId}`}
					label="意味"
					name={`phrases.${phraseIndex}.words.${wordIndex}.meaning`}
					control={control}
				/>
			</Stack>
		</article>
	);
}
