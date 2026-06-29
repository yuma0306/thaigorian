import type { SpeechLang } from '@/constants/speechLangs';
import type { Phrase } from '@/types/database';

export type MyPhraseCategorySummary = {
	id: string;
	title: string;
	speechLang: SpeechLang;
};

export type MyPhraseCategoryView = {
	id: string;
	title: string;
	speechLang: SpeechLang;
	phrases: Phrase[];
};
