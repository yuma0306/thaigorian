import type { SpeechLang } from '@/constants/speechLangs';
import type { ActionResult } from '@/types/actionResult';
import type { Phrase } from '@/types/database';

export type SaveMyCategoryPayload = {
	contentId: string;
	title: string;
	speechLang: SpeechLang;
	phrases: Phrase[];
};

export type SaveMyCategoryResult = ActionResult<{ contentId: string }>;
