import type { MyPhraseRow, MyWordRow, Phrase } from '@/types/database';

export function mapMyPhraseRow(phrase: MyPhraseRow, words: MyWordRow[]): Phrase {
	const mapped: Phrase = { fieldId: phrase.id };
	const text = phrase.phrase?.trim();
	const meaning = phrase.meaning?.trim();

	if (text) {
		mapped.phrase = text;
	}

	if (meaning) {
		mapped.meaning = meaning;
	}

	return {
		...mapped,
		words: words.map((word) => {
			const wordMapped: NonNullable<Phrase['words']>[number] = { fieldId: word.id };
			const wordText = word.word?.trim();
			const wordMeaning = word.meaning?.trim();

			if (wordText) {
				wordMapped.word = wordText;
			}

			if (wordMeaning) {
				wordMapped.meaning = wordMeaning;
			}

			return wordMapped;
		})
	};
}
