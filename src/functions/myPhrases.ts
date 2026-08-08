import { fetchMyCategoryList } from '@/functions/memberCategory/categorySpeechLang';
import { fetchMyPhraseCategoryView } from '@/functions/fetchMyPhraseCategoryView';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
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

/** レッスンなどサーバー側での取得用 */
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

	return fetchMyPhraseCategoryView(supabase, user.id, categoryId);
}
