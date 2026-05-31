'use server';

import { deleteCategoryPhrasesAndWords } from '@/functions/memberCategory/categoryContent';
import { getCurrentUser } from '@/functions/memberCategory/categoryAuth';
import { parseCategoryInput } from '@/functions/memberCategory/categoryInput';
import { insertCategoryContent } from '@/functions/memberCategory/insertCategoryContent';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';

export async function updateMyCategory(
	categoryId: string,
	{ contentId, title, phrases }: SaveMyCategoryPayload
): Promise<SaveMyCategoryResult> {
	const parsed = parseCategoryInput(contentId, title, phrases);
	if (!parsed.ok) {
		return parsed;
	}

	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const cleared = await deleteCategoryPhrasesAndWords(supabase, userId, categoryId);
	if (!cleared.ok) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const { error: categoryError } = await supabase
		.from('my_categories')
		.update({
			title: parsed.normalizedTitle,
			slug: parsed.normalizedContentId,
			updated_at: new Date().toISOString()
		})
		.eq('id', categoryId)
		.eq('user_id', userId);

	if (categoryError) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	const result = await insertCategoryContent(
		supabase,
		userId,
		categoryId,
		parsed.normalizedPhrases
	);

	if (!result.ok) {
		return { ok: false, message: '保存に失敗しました。' };
	}

	return { ok: true, contentId: parsed.normalizedContentId };
}
