import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { PhraseWrite, WordWrite } from '@/types/categoryContentDiff';
import type { SimpleActionResult } from '@/types/actionResult';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function updatePhrases(
	supabase: Supabase,
	userId: string,
	categoryId: string,
	phrases: PhraseWrite[]
): Promise<SimpleActionResult> {
	const results = await Promise.all(
		phrases.map((phrase) =>
			supabase
				.from('my_phrases')
				.update({
					phrase: phrase.phrase,
					meaning: phrase.meaning,
					sort_order: phrase.sortOrder
				})
				.eq('id', phrase.fieldId)
				.eq('user_id', userId)
				.eq('category_id', categoryId)
		)
	);

	return { ok: results.every((result) => !result.error) };
}

export async function updateWords(
	supabase: Supabase,
	userId: string,
	words: WordWrite[]
): Promise<SimpleActionResult> {
	const results = await Promise.all(
		words.map((word) =>
			supabase
				.from('my_words')
				.update({
					word: word.word,
					meaning: word.meaning,
					sort_order: word.sortOrder
				})
				.eq('id', word.id)
				.eq('user_id', userId)
		)
	);

	return { ok: results.every((result) => !result.error) };
}
