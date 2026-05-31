'use server';

import { deleteCategoryPhrasesAndWords } from '@/app/member/phrases/categoryContent';
import { getCurrentUser } from '@/app/member/phrases/categoryAuth';
import type { SaveMyCategoryResult } from '@/types/myCategory';

export async function deleteMyCategory(categoryId: string): Promise<SaveMyCategoryResult> {
	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const cleared = await deleteCategoryPhrasesAndWords(supabase, userId, categoryId);
	if (!cleared.ok) {
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
