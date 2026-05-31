import type { ActionResult } from '@/types/actionResult';
import type { Phrase } from '@/types';

export type SaveMyCategoryPayload = {
	contentId: string;
	title: string;
	phrases: Phrase[];
};

export type SaveMyCategoryResult = ActionResult<{ contentId: string }>;
