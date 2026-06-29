import type { SpeechLang } from '@/constants/speechLangs';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';
import type { PhraseField } from '@/types/myCategoryRegister';

export type MyCategoryRegisterProps = {
	categoryId?: string;
	initialPhrases?: PhraseField[];
	initialTitle?: string;
	initialContentId?: string;
	initialSpeechLang?: SpeechLang;
	onDelete?: (categoryId: string) => Promise<SaveMyCategoryResult>;
	onSave: (payload: SaveMyCategoryPayload) => Promise<SaveMyCategoryResult>;
	saveLabel?: string;
};
