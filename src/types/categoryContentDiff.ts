export type PhraseWrite = {
	fieldId: string;
	phrase: string;
	meaning: string;
	sortOrder: number;
};

export type WordWrite = {
	id: string;
	word: string;
	meaning: string;
	sortOrder: number;
};

export type WordInsert = {
	phraseFieldId: string;
	word: string;
	meaning: string;
	sortOrder: number;
};

export type CategoryContentDiff = {
	phraseIdsToDelete: string[];
	phrasesToInsert: PhraseWrite[];
	phrasesToUpdate: PhraseWrite[];
	wordIdsToDelete: string[];
	wordsToInsert: WordInsert[];
	wordsToUpdate: WordWrite[];
};
