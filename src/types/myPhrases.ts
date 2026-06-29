import type { SpeechLang } from '@/constants/speechLangs';
import type { Phrase } from '@/types/database';

export type MyPhraseCategorySummary = {
	id: string;
	title: string;
};

export type MyPhraseCategoryView = {
	id: string;
	title: string;
	speechLang: SpeechLang;
	phrases: Phrase[];
};
