import { fetchWordsByPhraseIds, groupWordsByPhraseId } from '@/functions/memberCategoryPhrases';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { MyCategoryTitleRow, MyPhraseRow, MyWordRow, Phrase } from '@/types/database';

export type MyPhraseCategorySummary = {
	id: string;
	title: string;
};

export type MyPhraseCategoryView = {
	id: string;
	title: string;
	phrases: Phrase[];
};

function toPhrase(phrase: MyPhraseRow, words: MyWordRow[]): Phrase {
	const mapped: Phrase = { fieldId: phrase.id };
	const text = phrase.phrase?.trim();
	const meaning = phrase.meaning?.trim();
	const ipa = phrase.ipa?.trim();

	if (text) {
		mapped.phrase = text;
	}

	if (meaning) {
		mapped.meaning = meaning;
	}

	if (ipa) {
		mapped.ipa = ipa;
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

export async function getMyPhraseCategorySummaries(): Promise<MyPhraseCategorySummary[] | null> {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return null;
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data: categoryRows } = await supabase
		.from('my_categories')
		.select('id,title')
		.eq('user_id', user.id)
		.order('updated_at', { ascending: false })
		.returns<MyCategoryTitleRow[]>();

	if (!categoryRows) {
		return [];
	}

	return categoryRows.map((category) => ({
		id: category.id,
		title: category.title ?? '無題'
	}));
}

export async function getMyPhraseCategoryById(
	categoryId: string
): Promise<MyPhraseCategoryView | null> {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return null;
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data: category } = await supabase
		.from('my_categories')
		.select('id,title')
		.eq('id', categoryId)
		.eq('user_id', user.id)
		.single<MyCategoryTitleRow>();

	if (!category) {
		return null;
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,ipa,sort_order')
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
		phrases: (phraseRows ?? []).map((phrase) =>
			toPhrase(phrase, wordsByPhraseId.get(phrase.id) ?? [])
		)
	};
}
