import type { SupabaseClient } from '@supabase/supabase-js';
import { fetchMyCategoryForEdit } from '@/functions/memberCategory/categorySpeechLang';
import { isMissingPhraseNoteColumn } from '@/functions/memberCategory/isMissingPhraseNoteColumn';
import type { MyPhraseEditRow, MyPhraseRow, MyWordRow } from '@/types/database';
import type { PhraseField } from '@/types/myCategoryRegister';

async function fetchPhraseRows(
	supabase: SupabaseClient,
	userId: string,
	categoryId: string
): Promise<MyPhraseRow[] | null> {
	const withNote = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,note,sort_order')
		.eq('category_id', categoryId)
		.eq('user_id', userId)
		.order('sort_order', { ascending: true })
		.overrideTypes<MyPhraseRow[], { merge: false }>();

	if (!withNote.error) {
		return withNote.data ?? [];
	}

	if (!isMissingPhraseNoteColumn(withNote.error)) {
		return null;
	}

	const withoutNote = await supabase
		.from('my_phrases')
		.select('id,category_id,phrase,meaning,sort_order')
		.eq('category_id', categoryId)
		.eq('user_id', userId)
		.order('sort_order', { ascending: true })
		.overrideTypes<Omit<MyPhraseRow, 'note'>[], { merge: false }>();

	if (withoutNote.error) {
		return null;
	}

	return (withoutNote.data ?? []).map((phrase) => ({ ...phrase, note: null }));
}

async function fetchWordsByPhraseIds(
	supabase: SupabaseClient,
	userId: string,
	phraseIds: string[]
) {
	if (phraseIds.length === 0) {
		return [] as MyWordRow[];
	}

	const { data } = await supabase
		.from('my_words')
		.select('id,phrase_id,word,meaning,sort_order')
		.eq('user_id', userId)
		.in('phrase_id', phraseIds)
		.order('sort_order', { ascending: true })
		.overrideTypes<MyWordRow[], { merge: false }>();

	return data ?? [];
}

export async function fetchOwnedCategoryPhrases(
	supabase: SupabaseClient,
	userId: string,
	categoryId: string
) {
	const [category, phraseRows] = await Promise.all([
		fetchMyCategoryForEdit(supabase, userId, categoryId),
		fetchPhraseRows(supabase, userId, categoryId)
	]);

	if (!category || !phraseRows) {
		return null;
	}
	const wordRows = await fetchWordsByPhraseIds(
		supabase,
		userId,
		phraseRows.map((phrase) => phrase.id)
	);

	return { category, phraseRows, wordRows };
}

export function groupWordsByPhraseId(wordRows: MyWordRow[]) {
	return wordRows.reduce((wordsByPhraseId, word) => {
		wordsByPhraseId.set(word.phrase_id, [...(wordsByPhraseId.get(word.phrase_id) ?? []), word]);
		return wordsByPhraseId;
	}, new Map<string, MyWordRow[]>());
}

export function mapPhraseRowsToFields(
	phraseRows: MyPhraseEditRow[],
	wordsByPhraseId: Map<string, MyWordRow[]>
): PhraseField[] {
	return phraseRows.map((phrase) => ({
		id: phrase.id,
		phrase: phrase.phrase ?? '',
		meaning: phrase.meaning ?? '',
		note: phrase.note ?? '',
		words: (wordsByPhraseId.get(phrase.id) ?? []).map((word) => ({
			id: word.id,
			word: word.word ?? '',
			meaning: word.meaning ?? ''
		}))
	}));
}
