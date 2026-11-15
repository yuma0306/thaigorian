import { useFieldArray, type Control } from 'react-hook-form';
import { createWord } from '@/components/MyCategoryRegister/fieldFactory';
import { maxWordsPerPhrase } from '@/constants/myCategoryLimits';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';

type Params = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	onCloseMenu: () => void;
};

export function useWordFieldArray({ control, phraseIndex, onCloseMenu }: Params) {
	const wordFieldArray = useFieldArray({
		control,
		name: `phrases.${phraseIndex}.words`,
		keyName: 'fieldKey'
	});
	const canAddWord = wordFieldArray.fields.length < maxWordsPerPhrase;

	function handleAddWord() {
		if (!canAddWord) {
			return;
		}

		wordFieldArray.append(createWord());
	}

	function handleInsertWord(index: number) {
		if (!canAddWord) {
			onCloseMenu();
			return;
		}

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

	return {
		wordFields: wordFieldArray.fields,
		canAddWord,
		handleAddWord,
		handleInsertWord,
		handleRemoveWord,
		handleMoveWord
	};
}
