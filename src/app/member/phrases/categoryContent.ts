import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { SimpleActionResult } from '@/types/actionResult';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function deleteCategoryPhrasesAndWords(
	supabase: Supabase,
	userId: string,
	categoryId: string
): Promise<SimpleActionResult> {
	const { data: existingPhrases, error: phrasesSelectError } = await supabase
		.from('my_phrases')
		.select('id')
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	if (phrasesSelectError) {
		return { ok: false as const };
	}

	const phraseIds = (existingPhrases ?? []).map((phrase) => phrase.id as string);

	if (phraseIds.length > 0) {
		const { error: wordsDeleteError } = await supabase
			.from('my_words')
			.delete()
			.eq('user_id', userId)
			.in('phrase_id', phraseIds);

		if (wordsDeleteError) {
			return { ok: false as const };
		}
	}

	const { error: phrasesDeleteError } = await supabase
		.from('my_phrases')
		.delete()
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	return { ok: !phrasesDeleteError };
}
