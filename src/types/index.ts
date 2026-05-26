type Base = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
};

export type Situation = Base &
	Partial<{
		title: string;
		phrases: Phrase[];
	}>;

export type Phrase = {
	fieldId: string;
} & Partial<{
	phrase: string;
	ipa: string;
	meaning: string;
	words: Word[];
}>;

type Word = {
	fieldId: string;
} & Partial<{
	word: string;
	meaning: string;
}>;

export type LessonResult = {
	phrase: Phrase;
	correct: boolean;
};
