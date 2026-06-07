import type { Phrase } from '@/types/database';
import { parseSaveMyCategoryInput } from '@/schemas/myCategory';

export function parseCategoryInput(contentId: string, title: string, phrases: Phrase[]) {
	return parseSaveMyCategoryInput(contentId, title, phrases);
}
