import { diffWords } from '@/functions/memberCategory/categoryContentWordDiff';
import { groupWordsByPhraseId } from '@/functions/memberCategoryPhrases';
import type { NormalizedPhrase } from '@/schemas/myCategory';
import type { CategoryContentDiff } from '@/types/categoryContentDiff';
import type { MyPhraseRow, MyWordRow } from '@/types/database';

function isSamePhrase(row: MyPhraseRow, phrase: NormalizedPhrase, sortOrder: number) {
	return (
		(row.phrase ?? '') === phrase.phrase &&
		(row.meaning ?? '') === phrase.meaning &&
		(row.sort_order ?? 0) === sortOrder
	);
}

function emptyDiff(): CategoryContentDiff {
	return {
		phraseIdsToDelete: [],
		phrasesToInsert: [],
		phrasesToUpdate: [],
		wordIdsToDelete: [],
		wordsToInsert: [],
		wordsToUpdate: []
	};
}

function diffOnePhrase(
	rowById: Record<string, MyPhraseRow>,
	wordsByPhraseId: Map<string, MyWordRow[]>,
	phrase: NormalizedPhrase,
	sortOrder: number
): CategoryContentDiff {
	const row = rowById[phrase.fieldId];
	const write = {
		fieldId: phrase.fieldId,
		phrase: phrase.phrase,
		meaning: phrase.meaning,
		sortOrder
	};

	if (!row) {
		return {
			...emptyDiff(),
			phrasesToInsert: [write],
			wordsToInsert: diffWords([], phrase).wordsToInsert
		};
	}

	return {
		...emptyDiff(),
		...diffWords(wordsByPhraseId.get(phrase.fieldId) ?? [], phrase),
		phrasesToUpdate: isSamePhrase(row, phrase, sortOrder) ? [] : [write]
	};
}

function mergeDiff(left: CategoryContentDiff, right: CategoryContentDiff): CategoryContentDiff {
	return {
		phraseIdsToDelete: left.phraseIdsToDelete,
		phrasesToInsert: [...left.phrasesToInsert, ...right.phrasesToInsert],
		phrasesToUpdate: [...left.phrasesToUpdate, ...right.phrasesToUpdate],
		wordIdsToDelete: [...left.wordIdsToDelete, ...right.wordIdsToDelete],
		wordsToInsert: [...left.wordsToInsert, ...right.wordsToInsert],
		wordsToUpdate: [...left.wordsToUpdate, ...right.wordsToUpdate]
	};
}

export function diffCategoryContent(
	phraseRows: MyPhraseRow[],
	wordRows: MyWordRow[],
	phrases: NormalizedPhrase[]
): CategoryContentDiff {
	const submittedIds = new Set(phrases.map((phrase) => phrase.fieldId));
	const rowById = Object.fromEntries(phraseRows.map((row) => [row.id, row]));
	const wordsByPhraseId = groupWordsByPhraseId(wordRows);
	const phraseIdsToDelete = phraseRows
		.filter((row) => !submittedIds.has(row.id))
		.map((row) => row.id);

	return phrases.reduce(
		(diff, phrase, sortOrder) =>
			mergeDiff(diff, diffOnePhrase(rowById, wordsByPhraseId, phrase, sortOrder)),
		{
			...emptyDiff(),
			phraseIdsToDelete,
			wordIdsToDelete: phraseIdsToDelete.flatMap((phraseId) =>
				(wordsByPhraseId.get(phraseId) ?? []).map((word) => word.id)
			)
		}
	);
}
