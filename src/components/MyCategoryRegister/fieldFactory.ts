import type { PhraseField, WordField } from '@/types/myCategoryRegister';

export const createId = () => crypto.randomUUID();

export const createWord = (): WordField => ({
	id: createId(),
	word: '',
	meaning: ''
});

export const createPhrase = (): PhraseField => ({
	id: createId(),
	phrase: '',
	meaning: '',
	words: []
});
