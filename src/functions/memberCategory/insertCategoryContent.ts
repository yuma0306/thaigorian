import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { normalizePhrases } from '@/functions/memberCategory/categoryInput';
import type { MyPhraseSavedRow } from '@/types/database';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function insertCategoryContent(
	supabase: Supabase,
	userId: string,
	categoryId: string,
	phrases: ReturnType<typeof normalizePhrases>
) {
	const phraseRows = phrases.map((phrase, index) => ({
		user_id: userId,
		category_id: categoryId,
		phrase: phrase.phrase,
		meaning: phrase.meaning,
		sort_order: index
	}));

	if (phraseRows.length === 0) {
		return { ok: true as const };
	}

	const { data: savedPhrases, error: phrasesError } = await supabase
		.from('my_phrases')
		.insert(phraseRows)
		.select('id,sort_order')
		.returns<MyPhraseSavedRow[]>();

	if (phrasesError || !savedPhrases) {
		return { ok: false as const };
	}

	const phraseIdBySortOrder = new Map(savedPhrases.map((phrase) => [phrase.sort_order, phrase.id]));
	const wordRows = phrases.flatMap((phrase, phraseIndex) => {
		const phraseId = phraseIdBySortOrder.get(phraseIndex);
		if (!phraseId) {
			return [];
		}

		return phrase.words.map((word, wordIndex) => ({
			user_id: userId,
			phrase_id: phraseId,
			word: word.word,
			meaning: word.meaning,
			sort_order: wordIndex
		}));
	});

	if (wordRows.length === 0) {
		return { ok: true as const };
	}

	const { error: wordsError } = await supabase.from('my_words').insert(wordRows);

	return { ok: !wordsError };
}
