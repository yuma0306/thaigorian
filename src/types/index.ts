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

export type Exam = Base &
	Partial<{
		title: string;
		questions: ExamQuestion[];
	}>;

export type ExamQuestion = {
	fieldId: string;
} & Partial<{
	title: string;
	meaning: string;
	ipa: string;
	words: ExamWord[];
	options: ExamOption[];
}>;

export type ExamWord = {
	fieldId: string;
} & Partial<{
	word: string;
	meaning: string;
}>;

type ExamOption = {
	fieldId: string;
} & Partial<{
	option: string;
	ipa: string;
	meaning: string;
	isCorrect: boolean;
	words: ExamWord[];
}>;

export type ExamResult = Partial<{
	question: ExamQuestion;
	selectedOptionIndex: number;
	correct: boolean;
}>;
