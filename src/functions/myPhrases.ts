import {
	fetchMyCategoryForEdit,
	fetchMyCategoryList
} from '@/functions/memberCategory/categorySpeechLang';
import { fetchWordsByPhraseIds, groupWordsByPhraseId } from '@/functions/memberCategoryPhrases';
import { mapMyPhraseRow } from '@/functions/mapMyPhraseRow';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { MyPhraseRow } from '@/types/database';
import type { MyPhraseCategorySummary, MyPhraseCategoryView } from '@/types/myPhrases';

export type { MyPhraseCategorySummary, MyPhraseCategoryView } from '@/types/myPhrases';

export async function getMyPhraseCategorySummaries(): Promise<MyPhraseCategorySummary[] | null> {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { categories, error } = await fetchMyCategoryList(supabase, user.id);

	if (error || !categories) {
		return [];
	}

	return categories.map((category) => ({
		id: category.id,
		title: category.title ?? '無題',
		speechLang: category.speechLang
	}));
}

export async function getMyPhraseCategoryById(
	categoryId: string
): Promise<MyPhraseCategoryView | null> {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const category = await fetchMyCategoryForEdit(supabase, user.id, categoryId);

	if (!category) {
		return null;
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,sort_order')
		.eq('category_id', category.id)
		.eq('user_id', user.id)
		.order('sort_order', { ascending: true })
		.returns<MyPhraseRow[]>();

	const phraseIds = (phraseRows ?? []).map((phrase) => phrase.id);
	const wordRows = await fetchWordsByPhraseIds(supabase, user.id, phraseIds);
	const wordsByPhraseId = groupWordsByPhraseId(wordRows);

	return {
		id: category.id,
		title: category.title ?? '無題',
		speechLang: category.speechLang,
		phrases: (phraseRows ?? []).map((phrase) =>
			mapMyPhraseRow(phrase, wordsByPhraseId.get(phrase.id) ?? [])
		)
	};
}
