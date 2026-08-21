import { z } from 'zod';
import { speechLangOptions, type SpeechLang } from '@/constants/speechLangs';

const contentIdPattern = /^[a-zA-Z0-9_-]+$/;

const trimmedString = z.string().trim();

const speechLangSchema = z.enum(
	speechLangOptions.map((option) => option.value) as [SpeechLang, ...SpeechLang[]]
);

const wordPayloadSchema = z.object({
	fieldId: trimmedString.min(1),
	word: trimmedString,
	meaning: trimmedString
});

const phrasePayloadSchema = z.object({
	fieldId: trimmedString.min(1),
	phrase: trimmedString,
	meaning: trimmedString,
	words: z.array(wordPayloadSchema)
});

type PhraseContent = {
	phrase?: string | null;
	meaning?: string | null;
	words?: { word?: string | null; meaning?: string | null }[];
};

export function isFilledPhrase({ phrase, meaning, words }: PhraseContent): boolean {
	if (phrase?.trim()) {
		return true;
	}
	if (meaning?.trim()) {
		return true;
	}
	return (words ?? []).some((word) => Boolean(word.word?.trim() || word.meaning?.trim()));
}

const saveMyCategorySchema = z.object({
	contentId: trimmedString.min(1).regex(contentIdPattern),
	title: trimmedString.min(1),
	speechLang: speechLangSchema,
	phrases: z.array(phrasePayloadSchema)
});

const wordFormFieldSchema = z.object({
	id: trimmedString.min(1),
	word: trimmedString,
	meaning: trimmedString
});

const phraseFormFieldSchema = z.object({
	id: trimmedString.min(1),
	phrase: trimmedString,
	meaning: trimmedString,
	words: z.array(wordFormFieldSchema)
});

export const categoryRegisterFormSchema = z.object({
	contentId: trimmedString.min(1).regex(contentIdPattern),
	title: trimmedString.min(1),
	speechLang: speechLangSchema,
	phrases: z.array(phraseFormFieldSchema)
});

export type SaveMyCategoryInput = z.infer<typeof saveMyCategorySchema>;
export type NormalizedPhrase = z.infer<typeof phrasePayloadSchema>;
export type CategoryRegisterFormValues = z.infer<typeof categoryRegisterFormSchema>;
export type PhraseField = CategoryRegisterFormValues['phrases'][number];
export type WordField = PhraseField['words'][number];

export function toSaveMyCategoryPayload(values: CategoryRegisterFormValues): SaveMyCategoryInput {
	return saveMyCategorySchema.parse({
		contentId: values.contentId,
		title: values.title,
		speechLang: values.speechLang,
		phrases: values.phrases.filter(isFilledPhrase).map((phrase) => ({
			fieldId: phrase.id,
			phrase: phrase.phrase,
			meaning: phrase.meaning,
			words: phrase.words.map((word) => ({
				fieldId: word.id,
				word: word.word,
				meaning: word.meaning
			}))
		}))
	});
}

export function parseSaveMyCategoryInput(
	contentId: string,
	title: string,
	speechLang: string,
	phrases: unknown
) {
	const result = saveMyCategorySchema.safeParse({ contentId, title, speechLang, phrases });
	if (!result.success) {
		return { ok: false as const, message: '入力内容を確認してください。' };
	}
	return {
		ok: true as const,
		normalizedContentId: result.data.contentId,
		normalizedTitle: result.data.title,
		normalizedSpeechLang: result.data.speechLang,
		normalizedPhrases: result.data.phrases.filter(isFilledPhrase)
	};
}
