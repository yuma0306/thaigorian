import type { SaveMyCategoryPayload } from '@/types/myCategory';
import type { PhraseField } from '@/types/myCategoryRegister';

export function toSavePayload(
	contentId: string,
	title: string,
	phrases: PhraseField[]
): SaveMyCategoryPayload {
	return {
		contentId: contentId.trim(),
		title: title.trim(),
		phrases: phrases.map((phrase) => ({
			fieldId: phrase.id,
			phrase: phrase.phrase.trim(),
			meaning: phrase.meaning.trim(),
			words: phrase.words.map((word) => ({
				fieldId: word.id,
				word: word.word.trim(),
				meaning: word.meaning.trim()
			}))
		}))
	};
}
