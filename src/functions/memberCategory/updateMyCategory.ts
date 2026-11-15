'use server';

import { updateMyCategoryRow } from '@/functions/memberCategory/categorySpeechLangPersist';
import { applyCategoryContentDiff } from '@/functions/memberCategory/applyCategoryContentDiff';
import { diffCategoryContent } from '@/functions/memberCategory/categoryContentDiff';
import { getCurrentUser } from '@/functions/memberCategory/categoryAuth';
import { parseCategoryInput } from '@/functions/memberCategory/categoryInput';
import { fetchOwnedCategoryPhrases } from '@/functions/memberCategoryPhrases';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/types/myCategory';

export async function updateMyCategory(
	categoryId: string,
	{ contentId, title, speechLang, phrases }: SaveMyCategoryPayload
): Promise<SaveMyCategoryResult> {
	const parsed = parseCategoryInput(contentId, title, speechLang, phrases);
	if (!parsed.ok) {
		return parsed;
	}

	const { supabase, userId, message } = await getCurrentUser();

	if (!supabase || !userId) {
		return { ok: false, message };
	}

	const owned = await fetchOwnedCategoryPhrases(supabase, userId, categoryId);
	if (!owned) {
		return { ok: false, message: 'Could not save.' };
	}

	const [categoryResult, contentResult] = await Promise.all([
		updateMyCategoryRow(supabase, categoryId, userId, {
			title: parsed.normalizedTitle,
			slug: parsed.normalizedContentId,
			speech_lang: parsed.normalizedSpeechLang,
			updated_at: new Date().toISOString()
		}),
		applyCategoryContentDiff(
			supabase,
			userId,
			categoryId,
			diffCategoryContent(owned.phraseRows, owned.wordRows, parsed.normalizedPhrases)
		)
	]);

	if (categoryResult.error || !contentResult.ok) {
		return { ok: false, message: 'Could not save.' };
	}

	return { ok: true, contentId: parsed.normalizedContentId };
}
