import type { SupabaseClient } from '@supabase/supabase-js';
import {
	fetchOwnedCategoryPhrases,
	groupWordsByPhraseId
} from '@/functions/memberCategoryPhrases';
import { mapMyPhraseRow } from '@/functions/mapMyPhraseRow';
import { isFilledPhrase } from '@/schemas/myCategory';
import type { MyPhraseCategoryView } from '@/types/myPhrases';

export async function fetchMyPhraseCategoryView(
	supabase: SupabaseClient,
	userId: string,
	categoryId: string
): Promise<MyPhraseCategoryView | null> {
	const owned = await fetchOwnedCategoryPhrases(supabase, userId, categoryId);

	if (!owned) {
		return null;
	}

	const wordsByPhraseId = groupWordsByPhraseId(owned.wordRows);

	return {
		id: owned.category.id,
		title: owned.category.title ?? 'Untitled',
		speechLang: owned.category.speechLang,
		phrases: owned.phraseRows
			.map((phrase) => mapMyPhraseRow(phrase, wordsByPhraseId.get(phrase.id) ?? []))
			.filter(isFilledPhrase)
	};
}
