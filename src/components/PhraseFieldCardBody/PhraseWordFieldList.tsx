import type { MouseEvent } from 'react';
import type { Control, FieldArrayWithId } from 'react-hook-form';
import { WordFieldCard } from '@/components/WordFieldCard/WordFieldCard';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Stack } from '../Stack/Stack';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	wordFields: FieldArrayWithId<CategoryRegisterFormValues, `phrases.${number}.words`, 'fieldKey'>[];
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertWord: (index: number) => void;
	onMoveWord: (fromIndex: number, toIndex: number) => void;
	onRemoveWord: (index: number) => void;
};

export function PhraseWordFieldList({
	control,
	phraseIndex,
	wordFields,
	openMenu,
	onToggleMenu,
	onInsertWord,
	onMoveWord,
	onRemoveWord
}: Props) {
	return (
		<Stack variant="ul" size={2}>
			{wordFields.map((word, wordIndex) => (
				<WordFieldCard
					key={word.fieldKey}
					control={control}
					phraseIndex={phraseIndex}
					wordIndex={wordIndex}
					wordId={word.id}
					wordCount={wordFields.length}
					openMenu={openMenu}
					onToggleMenu={onToggleMenu}
					onInsertWord={onInsertWord}
					onMoveWord={onMoveWord}
					onRemoveWord={onRemoveWord}
				/>
			))}
		</Stack>
	);
}
