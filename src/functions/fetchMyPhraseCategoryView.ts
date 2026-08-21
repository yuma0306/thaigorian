import type { SupabaseClient } from '@supabase/supabase-js';
import { fetchMyCategoryForEdit } from '@/functions/memberCategory/categorySpeechLang';
import { fetchWordsByPhraseIds, groupWordsByPhraseId } from '@/functions/memberCategoryPhrases';
import { mapMyPhraseRow } from '@/functions/mapMyPhraseRow';
import { isFilledPhrase } from '@/schemas/myCategory';
import type { MyPhraseRow } from '@/types/database';
import type { MyPhraseCategoryView } from '@/types/myPhrases';

export async function fetchMyPhraseCategoryView(
	supabase: SupabaseClient,
	userId: string,
	categoryId: string
): Promise<MyPhraseCategoryView | null> {
	const category = await fetchMyCategoryForEdit(supabase, userId, categoryId);

	if (!category) {
		return null;
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,sort_order')
		.eq('category_id', category.id)
		.eq('user_id', userId)
		.order('sort_order', { ascending: true })
		.returns<MyPhraseRow[]>();

	const phraseIds = (phraseRows ?? []).map((phrase) => phrase.id);
	const wordRows = await fetchWordsByPhraseIds(supabase, userId, phraseIds);
	const wordsByPhraseId = groupWordsByPhraseId(wordRows);

	return {
		id: category.id,
		title: category.title ?? '無題',
		speechLang: category.speechLang,
		phrases: (phraseRows ?? [])
			.map((phrase) => mapMyPhraseRow(phrase, wordsByPhraseId.get(phrase.id) ?? []))
			.filter(isFilledPhrase)
	};
}
