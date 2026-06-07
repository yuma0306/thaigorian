export type { PhraseField, WordField } from '@/schemas/myCategory';

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
