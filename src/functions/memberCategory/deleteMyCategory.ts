'use server';

import { deleteCategoryPhrasesAndWords } from '@/functions/memberCategory/categoryContent';
import { getCurrentUser } from '@/functions/memberCategory/categoryAuth';
import type { SaveMyCategoryResult } from '@/types/myCategory';

export async function deleteMyCategory(categoryId: string): Promise<SaveMyCategoryResult> {
	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const cleared = await deleteCategoryPhrasesAndWords(supabase, userId, categoryId);
	if (!cleared.ok) {
		return { ok: false, message: 'Could not delete.' };
	}

	const { error: categoryDeleteError } = await supabase
		.from('my_categories')
		.delete()
		.eq('id', categoryId)
		.eq('user_id', userId);

	if (categoryDeleteError) {
		return { ok: false, message: 'Could not delete.' };
	}

	return { ok: true, contentId: categoryId };
}
