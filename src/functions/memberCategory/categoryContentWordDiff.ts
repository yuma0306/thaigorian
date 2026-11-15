import type { NormalizedPhrase } from '@/schemas/myCategory';
import type { CategoryContentDiff } from '@/types/categoryContentDiff';
import type { MyWordRow } from '@/types/database';

function isSameWord(row: MyWordRow, word: NormalizedPhrase['words'][number], sortOrder: number) {
	return (
		(row.word ?? '') === word.word &&
		(row.meaning ?? '') === word.meaning &&
		(row.sort_order ?? 0) === sortOrder
	);
}

export function diffWords(
	existing: MyWordRow[],
	phrase: NormalizedPhrase
): Pick<CategoryContentDiff, 'wordIdsToDelete' | 'wordsToInsert' | 'wordsToUpdate'> {
	const existingIds = new Set(existing.map((word) => word.id));
	const submittedIds = new Set(phrase.words.map((word) => word.fieldId));
	const rowById = Object.fromEntries(existing.map((word) => [word.id, word]));

	return {
		wordIdsToDelete: existing.filter((word) => !submittedIds.has(word.id)).map((word) => word.id),
		wordsToInsert: phrase.words.flatMap((word, sortOrder) =>
			existingIds.has(word.fieldId)
				? []
				: [
						{
							phraseFieldId: phrase.fieldId,
							word: word.word,
							meaning: word.meaning,
							sortOrder
						}
					]
		),
		wordsToUpdate: phrase.words.flatMap((word, sortOrder) => {
			const row = rowById[word.fieldId];
			if (!row || isSameWord(row, word, sortOrder)) {
				return [];
			}

			return [{ id: word.fieldId, word: word.word, meaning: word.meaning, sortOrder }];
		})
	};
}
