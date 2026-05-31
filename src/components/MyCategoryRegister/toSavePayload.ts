import type { SaveMyCategoryPayload } from '@/types/myCategory';
import type { PhraseField } from '@/types/myCategoryRegister';

export function toSavePayload(
	contentId: string,
	title: string,
	phrases: PhraseField[]
): SaveMyCategoryPayload {
	return {
		contentId,
		title,
		phrases: phrases.map((phrase) => ({
			fieldId: phrase.id,
			phrase: phrase.phrase,
			meaning: phrase.meaning,
			ipa: phrase.ipa,
			words: phrase.words.map((word) => ({
				fieldId: word.id,
				word: word.word,
				meaning: word.meaning
			}))
		}))
	};
}
