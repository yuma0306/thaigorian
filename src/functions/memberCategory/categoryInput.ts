import type { Phrase } from '@/types/database';

const contentIdPattern = /^[a-zA-Z0-9_-]+$/;

function normalizeText(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

export function normalizePhrases(value: Phrase[]) {
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

export function parseCategoryInput(contentId: string, title: string, phrases: Phrase[]) {
	const normalizedContentId = normalizeText(contentId);
	const normalizedTitle = normalizeText(title);
	const normalizedPhrases = normalizePhrases(phrases);

	if (!normalizedContentId || !contentIdPattern.test(normalizedContentId) || !normalizedTitle) {
		return { ok: false as const, message: 'タイトルを確認してください。' };
	}

	return { ok: true as const, normalizedContentId, normalizedTitle, normalizedPhrases };
}
