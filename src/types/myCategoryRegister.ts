export type WordField = {
	id: string;
	word: string;
	meaning: string;
};

export type PhraseField = {
	id: string;
	phrase: string;
	meaning: string;
	ipa: string;
	words: WordField[];
};

export type MenuState =
	| {
			type: 'phrase';
			id: string;
	  }
	| {
			type: 'word';
			id: string;
	  }
	| null;
