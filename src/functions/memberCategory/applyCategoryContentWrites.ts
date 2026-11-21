import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { PhraseWrite, WordInsert } from '@/types/categoryContentDiff';
import type { SimpleActionResult } from '@/types/actionResult';
import type { MyPhraseSavedRow } from '@/types/database';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function insertPhrases(
	supabase: Supabase,
	userId: string,
	categoryId: string,
	phrases: PhraseWrite[]
): Promise<{ ok: true; idsByFieldId: Record<string, string> } | { ok: false }> {
	if (phrases.length === 0) {
		return { ok: true as const, idsByFieldId: {} };
	}

	const { data, error } = await supabase
		.from('my_phrases')
		.insert(
			phrases.map((phrase) => ({
				user_id: userId,
				category_id: categoryId,
				phrase: phrase.phrase,
				meaning: phrase.meaning,
				note: phrase.note,
				sort_order: phrase.sortOrder
			}))
		)
		.select('id,sort_order')
		.overrideTypes<MyPhraseSavedRow[], { merge: false }>();

	if (error || !data) {
		return { ok: false as const };
	}

	const idBySortOrder = Object.fromEntries(data.map((row) => [row.sort_order, row.id]));
	const idsByFieldId = Object.fromEntries(
		phrases.flatMap((phrase) => {
			const id = idBySortOrder[phrase.sortOrder];
			return id ? [[phrase.fieldId, id]] : [];
		})
	);

	if (Object.keys(idsByFieldId).length !== phrases.length) {
		return { ok: false as const };
	}

	return { ok: true as const, idsByFieldId };
}

export async function insertWords(
	supabase: Supabase,
	userId: string,
	words: WordInsert[],
	idsByFieldId: Record<string, string>
): Promise<SimpleActionResult> {
	if (words.length === 0) {
		return { ok: true as const };
	}

	const rows = words.map((word) => ({
		user_id: userId,
		phrase_id: idsByFieldId[word.phraseFieldId] ?? word.phraseFieldId,
		word: word.word,
		meaning: word.meaning,
		sort_order: word.sortOrder
	}));

	if (rows.some((row) => !row.phrase_id)) {
		return { ok: false as const };
	}

	const { error } = await supabase.from('my_words').insert(rows);
	return { ok: !error };
}
