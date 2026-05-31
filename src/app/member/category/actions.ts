'use server';

import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { Phrase } from '@/types';

export type SaveMyCategoryPayload = {
	contentId: string;
	title: string;
	phrases: Phrase[];
};

export type SaveMyCategoryResult =
	| {
			ok: true;
			contentId: string;
	  }
	| {
			ok: false;
			message: string;
	  };

type SavedPhrase = {
	id: string;
	sort_order: number;
};

const contentIdPattern = /^[a-zA-Z0-9_-]+$/;

function normalizeText(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

function normalizePhrases(value: Phrase[]) {
	return value
		.map((phrase) => ({
			fieldId: normalizeText(phrase.fieldId),
			phrase: normalizeText(phrase.phrase),
			meaning: normalizeText(phrase.meaning),
			ipa: normalizeText(phrase.ipa),
			words: (phrase.words ?? []).map((word) => ({
				fieldId: normalizeText(word.fieldId),
				word: normalizeText(word.word),
				meaning: normalizeText(word.meaning)
			}))
		}))
		.filter((phrase) => phrase.fieldId);
}

async function getCurrentUser() {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return { supabase: null, userId: '', message: 'Supabaseの環境変数を設定してください。' };
	}

	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error || !user) {
		return { supabase, userId: '', message: 'ログインしてください。' };
	}

	return { supabase, userId: user.id, message: '' };
}

async function insertCategoryContent(
	supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
	userId: string,
	categoryId: string,
	phrases: ReturnType<typeof normalizePhrases>
) {
	const phraseRows = phrases.map((phrase, index) => ({
		user_id: userId,
		category_id: categoryId,
		phrase: phrase.phrase,
		ipa: phrase.ipa,
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
		.returns<SavedPhrase[]>();

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

export async function saveMyCategory({
	contentId,
	title,
	phrases
}: SaveMyCategoryPayload): Promise<SaveMyCategoryResult> {
	const normalizedContentId = normalizeText(contentId);
	const normalizedTitle = normalizeText(title);
	const normalizedPhrases = normalizePhrases(phrases);

	if (!normalizedContentId || !contentIdPattern.test(normalizedContentId) || !normalizedTitle) {
		return { ok: false, message: 'タイトルを確認してください。' };
	}

	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const { data: category, error: categoryError } = await supabase
		.from('my_categories')
		.insert({
			user_id: userId,
			title: normalizedTitle,
			slug: normalizedContentId
		})
		.select('id')
		.single();

	if (categoryError || !category) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const result = await insertCategoryContent(supabase, userId, category.id, normalizedPhrases);

	if (!result.ok) {
		await supabase.from('my_phrases').delete().eq('category_id', category.id);
		await supabase.from('my_categories').delete().eq('id', category.id);
		return { ok: false, message: '保存に失敗しました。' };
	}

	return { ok: true, contentId: normalizedContentId };
}

export async function updateMyCategory(
	categoryId: string,
	{ contentId, title, phrases }: SaveMyCategoryPayload
): Promise<SaveMyCategoryResult> {
	const normalizedContentId = normalizeText(contentId);
	const normalizedTitle = normalizeText(title);
	const normalizedPhrases = normalizePhrases(phrases);

	if (!normalizedContentId || !contentIdPattern.test(normalizedContentId) || !normalizedTitle) {
		return { ok: false, message: 'タイトルを確認してください。' };
	}

	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const { data: existingPhrases, error: phrasesSelectError } = await supabase
		.from('my_phrases')
		.select('id')
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	if (phrasesSelectError) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const phraseIds = (existingPhrases ?? []).map((phrase) => phrase.id as string);

	if (phraseIds.length > 0) {
		const { error: wordsDeleteError } = await supabase
			.from('my_words')
			.delete()
			.eq('user_id', userId)
			.in('phrase_id', phraseIds);

		if (wordsDeleteError) {
			return { ok: false, message: '保存に失敗しました。' };
		}
	}

	const { error: phrasesDeleteError } = await supabase
		.from('my_phrases')
		.delete()
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	if (phrasesDeleteError) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const { error: categoryError } = await supabase
		.from('my_categories')
		.update({
			title: normalizedTitle,
			slug: normalizedContentId,
			updated_at: new Date().toISOString()
		})
		.eq('id', categoryId)
		.eq('user_id', userId);

	if (categoryError) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const result = await insertCategoryContent(supabase, userId, categoryId, normalizedPhrases);

	if (!result.ok) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	return { ok: true, contentId: normalizedContentId };
}

export async function deleteMyCategory(categoryId: string): Promise<SaveMyCategoryResult> {
	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const { data: existingPhrases, error: phrasesSelectError } = await supabase
		.from('my_phrases')
		.select('id')
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	if (phrasesSelectError) {
		return { ok: false, message: '削除に失敗しました。' };
	}

	const phraseIds = (existingPhrases ?? []).map((phrase) => phrase.id as string);

	if (phraseIds.length > 0) {
		const { error: wordsDeleteError } = await supabase
			.from('my_words')
			.delete()
			.eq('user_id', userId)
			.in('phrase_id', phraseIds);

		if (wordsDeleteError) {
			return { ok: false, message: '削除に失敗しました。' };
		}
	}

	const { error: phrasesDeleteError } = await supabase
		.from('my_phrases')
		.delete()
		.eq('user_id', userId)
		.eq('category_id', categoryId);

	if (phrasesDeleteError) {
		return { ok: false, message: '削除に失敗しました。' };
	}

	const { error: categoryDeleteError } = await supabase
		.from('my_categories')
		.delete()
		.eq('id', categoryId)
		.eq('user_id', userId);

	if (categoryDeleteError) {
		return { ok: false, message: '削除に失敗しました。' };
	}

	return { ok: true, contentId: categoryId };
}
