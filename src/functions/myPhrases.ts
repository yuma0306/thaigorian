import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { Phrase } from '@/types';

export type MyPhraseCategorySummary = {
	id: string;
	title: string;
};

export type MyPhraseCategoryView = {
	id: string;
	title: string;
	phrases: Phrase[];
};

type CategoryRow = {
	id: string;
	title: string | null;
};

type PhraseRow = {
	id: string;
	category_id: string;
	phrase: string | null;
	meaning: string | null;
	ipa: string | null;
	sort_order: number | null;
};

type WordRow = {
	id: string;
	phrase_id: string;
	word: string | null;
	meaning: string | null;
	sort_order: number | null;
};

function toPhrase(phrase: PhraseRow, words: WordRow[]): Phrase {
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

/** ログイン中の会員カテゴリー一覧。未ログイン・Supabase未設定時は null */
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
		.returns<CategoryRow[]>();

	if (!categoryRows) {
		return [];
	}

	return categoryRows.map((category) => ({
		id: category.id,
		title: category.title ?? '無題のカテゴリー'
	}));
}

/** 会員のカテゴリー詳細（学習用）。存在しない・権限なしのとき null */
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
		.single<CategoryRow>();

	if (!category) {
		return null;
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,ipa,sort_order')
		.eq('category_id', category.id)
		.eq('user_id', user.id)
		.order('sort_order', { ascending: true })
		.returns<PhraseRow[]>();

	const phraseIds = (phraseRows ?? []).map((phrase) => phrase.id);
	const { data: wordRows } =
		phraseIds.length > 0
			? await supabase
					.from('my_words')
					.select('id,phrase_id,word,meaning,sort_order')
					.eq('user_id', user.id)
					.in('phrase_id', phraseIds)
					.order('sort_order', { ascending: true })
					.returns<WordRow[]>()
			: { data: [] as WordRow[] };

	const wordsByPhraseId = new Map<string, WordRow[]>();
	(wordRows ?? []).forEach((word) => {
		wordsByPhraseId.set(word.phrase_id, [...(wordsByPhraseId.get(word.phrase_id) ?? []), word]);
	});

	return {
		id: category.id,
		title: category.title ?? '無題のカテゴリー',
		phrases: (phraseRows ?? []).map((phrase) => toPhrase(phrase, wordsByPhraseId.get(phrase.id) ?? []))
	};
}
