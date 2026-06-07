import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { createWord } from '@/components/MyCategoryRegister/fieldFactory';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Stack } from '../Stack/Stack';
import { Typography } from '../Typography/Typography';
import { PhraseWordFieldList } from './PhraseWordFieldList';
import styles from './PhraseFieldCardBody.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	phraseId: string;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onCloseMenu: () => void;
};

export function PhraseFieldCardBody({
	control,
	phraseIndex,
	phraseId,
	openMenu,
	onToggleMenu,
	onCloseMenu
}: Props) {
	const wordFieldArray = useFieldArray({
		control,
		name: `phrases.${phraseIndex}.words`,
		keyName: 'fieldKey'
	});

	function handleAddWord() {
		wordFieldArray.append(createWord());
	}

	function handleInsertWord(index: number) {
		wordFieldArray.insert(index, createWord());
		onCloseMenu();
	}

	function handleRemoveWord(index: number) {
		wordFieldArray.remove(index);
		onCloseMenu();
	}

	function handleMoveWord(fromIndex: number, toIndex: number) {
		wordFieldArray.move(fromIndex, toIndex);
		onCloseMenu();
	}

	return (
		<Stack variant="div" size={2}>
			<CategoryTextField
				id={`phrase-${phraseId}`}
				label="フレーズ"
				name={`phrases.${phraseIndex}.phrase`}
				control={control}
			/>
			<CategoryTextField
				id={`meaning-${phraseId}`}
				label="意味"
				name={`phrases.${phraseIndex}.meaning`}
				control={control}
			/>
			<Stack variant="div" size={2}>
				<Typography size={3} variant="span" color="primary" weight="bold" align="left">
					用語
				</Typography>
				{wordFieldArray.fields.length > 0 && (
					<PhraseWordFieldList
						control={control}
						phraseIndex={phraseIndex}
						wordFields={wordFieldArray.fields}
						openMenu={openMenu}
						onToggleMenu={onToggleMenu}
						onInsertWord={handleInsertWord}
						onMoveWord={handleMoveWord}
						onRemoveWord={handleRemoveWord}
					/>
				)}
				<button
					className={styles.wordTimelineAddButton}
					type="button"
					onClick={handleAddWord}
					aria-label="用語のフィールドを追加"
				>
					<span aria-hidden="true">＋</span>
				</button>
			</Stack>
		</Stack>
	);
}
