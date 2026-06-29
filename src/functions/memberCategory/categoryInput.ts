import type { Phrase } from '@/types/database';
import { parseSaveMyCategoryInput } from '@/schemas/myCategory';

export function parseCategoryInput(
	contentId: string,
	title: string,
	speechLang: string,
	phrases: Phrase[]
) {
	return parseSaveMyCategoryInput(contentId, title, speechLang, phrases);
}
