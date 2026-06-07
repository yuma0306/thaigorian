import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { createWord } from '@/components/MyCategoryRegister/fieldFactory';
import { PhraseAddButton } from '@/components/PhraseAddButton/PhraseAddButton';
import { PhraseAddButtonWrapper } from '@/components/PhraseAddButtonWrapper/PhraseAddButtonWrapper';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { FlexColumn } from '../FlexColumn/FlexColumn';
import { Typography } from '../Typography/Typography';
import { PhraseWordFieldList } from './PhraseWordFieldList';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onCloseMenu: () => void;
};

export function PhraseWordFieldsSection({
	control,
	phraseIndex,
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
		<>
			<FlexColumn gap={1} variant="div" alignItems="center">
				<Typography size={3} variant="span" color="primary" weight="bold" align="left">
					用語
				</Typography>
				{wordFieldArray.fields.length < 1 && (
					<PhraseAddButton
						onClick={handleAddWord}
						layer="secound"
						position="left"
						isAbsolute={false}
					/>
				)}
			</FlexColumn>
			{wordFieldArray.fields.length > 0 && (
				<>
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
					<PhraseAddButtonWrapper layer="secound">
						<PhraseAddButton onClick={handleAddWord} layer="secound" position="center" isAbsolute />
					</PhraseAddButtonWrapper>
				</>
			)}
		</>
	);
}
