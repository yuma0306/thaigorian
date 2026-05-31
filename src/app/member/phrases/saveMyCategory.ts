'use server';

import { getCurrentUser } from '@/app/member/phrases/categoryAuth';
import { parseCategoryInput } from '@/app/member/phrases/categoryInput';
import { insertCategoryContent } from '@/app/member/phrases/insertCategoryContent';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';

export async function saveMyCategory({
	contentId,
	title,
	phrases
}: SaveMyCategoryPayload): Promise<SaveMyCategoryResult> {
	const parsed = parseCategoryInput(contentId, title, phrases);
	if (!parsed.ok) {
		return parsed;
	}

	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const { data: category, error: categoryError } = await supabase
		.from('my_categories')
		.insert({
			user_id: userId,
			title: parsed.normalizedTitle,
			slug: parsed.normalizedContentId
		})
		.select('id')
		.single();

	if (categoryError || !category) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const result = await insertCategoryContent(
		supabase,
		userId,
		category.id,
		parsed.normalizedPhrases
	);

	if (!result.ok) {
		await supabase.from('my_phrases').delete().eq('category_id', category.id);
		await supabase.from('my_categories').delete().eq('id', category.id);
		return { ok: false, message: '保存に失敗しました。' };
	}

	return { ok: true, contentId: parsed.normalizedContentId };
}
