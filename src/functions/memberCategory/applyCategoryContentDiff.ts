import { insertPhrases, insertWords } from '@/functions/memberCategory/applyCategoryContentWrites';
import {
	updatePhrases,
	updateWords
} from '@/functions/memberCategory/applyCategoryContentUpdates';
import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { CategoryContentDiff } from '@/types/categoryContentDiff';
import type { SimpleActionResult } from '@/types/actionResult';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

async function deleteByIds(
	supabase: Supabase,
	table: 'my_phrases' | 'my_words',
	userId: string,
	ids: string[]
): Promise<SimpleActionResult> {
	if (ids.length === 0) {
		return { ok: true as const };
	}

	const { error } = await supabase.from(table).delete().eq('user_id', userId).in('id', ids);
	return { ok: !error };
}

export async function applyCategoryContentDiff(
	supabase: Supabase,
	userId: string,
	categoryId: string,
	diff: CategoryContentDiff
): Promise<SimpleActionResult> {
	const wordsDeleted = await deleteByIds(supabase, 'my_words', userId, diff.wordIdsToDelete);
	if (!wordsDeleted.ok) {
		return wordsDeleted;
	}

	const phrasesDeleted = await deleteByIds(
		supabase,
		'my_phrases',
		userId,
		diff.phraseIdsToDelete
	);
	if (!phrasesDeleted.ok) {
		return phrasesDeleted;
	}

	const inserted = await insertPhrases(supabase, userId, categoryId, diff.phrasesToInsert);
	if (!inserted.ok) {
		return inserted;
	}

	const [phraseUpdates, wordInserts, wordUpdates] = await Promise.all([
		updatePhrases(supabase, userId, categoryId, diff.phrasesToUpdate),
		insertWords(supabase, userId, diff.wordsToInsert, inserted.idsByFieldId),
		updateWords(supabase, userId, diff.wordsToUpdate)
	]);

	if (!phraseUpdates.ok || !wordInserts.ok || !wordUpdates.ok) {
		return { ok: false as const };
	}

	return { ok: true as const };
}
