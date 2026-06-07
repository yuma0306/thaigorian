import { useFieldArray, type Control } from 'react-hook-form';
import { createPhrase } from '@/components/MyCategoryRegister/fieldFactory';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';

type Params = {
	control: Control<CategoryRegisterFormValues>;
	onCloseMenu: () => void;
};

export function usePhraseFieldArray({ control, onCloseMenu }: Params) {
	const phraseFieldArray = useFieldArray({
		control,
		name: 'phrases',
		keyName: 'fieldKey'
	});

	function handleAddPhrase() {
		phraseFieldArray.append(createPhrase());
	}

	function handleInsertPhrase(index: number) {
		phraseFieldArray.insert(index, createPhrase());
		onCloseMenu();
	}

	function handleRemovePhrase(index: number) {
		phraseFieldArray.remove(index);
		onCloseMenu();
	}

	function handleMovePhrase(fromIndex: number, toIndex: number) {
		phraseFieldArray.move(fromIndex, toIndex);
		onCloseMenu();
	}

	return {
		phraseFields: phraseFieldArray.fields,
		handleAddPhrase,
		handleInsertPhrase,
		handleRemovePhrase,
		handleMovePhrase
	};
}
