import type { SupabaseClient } from '@supabase/supabase-js';
import type { MyPhraseEditRow, MyWordRow } from '@/types/database';
import type { PhraseField } from '@/types/myCategoryRegister';

export async function fetchWordsByPhraseIds(
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
		.returns<MyWordRow[]>();

	return data ?? [];
}

export function groupWordsByPhraseId(wordRows: MyWordRow[]) {
	const wordsByPhraseId = new Map<string, MyWordRow[]>();
	wordRows.forEach((word) => {
		wordsByPhraseId.set(word.phrase_id, [...(wordsByPhraseId.get(word.phrase_id) ?? []), word]);
	});
	return wordsByPhraseId;
}

export function mapPhraseRowsToFields(
	phraseRows: MyPhraseEditRow[],
	wordsByPhraseId: Map<string, MyWordRow[]>
): PhraseField[] {
	return phraseRows.map((phrase) => ({
		id: phrase.id,
		phrase: phrase.phrase ?? '',
		meaning: phrase.meaning ?? '',
		ipa: phrase.ipa ?? '',
		words: (wordsByPhraseId.get(phrase.id) ?? []).map((word) => ({
			id: word.id,
			word: word.word ?? '',
			meaning: word.meaning ?? ''
		}))
	}));
}
