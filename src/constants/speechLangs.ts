export const defaultSpeechLang = 'th-TH';

export const speechLangOptions = [
	{ value: 'th-TH', label: 'タイ語' },
	{ value: 'en-US', label: '英語' }
] as const;

export type SpeechLang = (typeof speechLangOptions)[number]['value'];

const speechLangSet = new Set<string>(speechLangOptions.map((option) => option.value));

function isSpeechLang(value: string): value is SpeechLang {
	return speechLangSet.has(value);
}

export function resolveSpeechLang(value?: string | null): SpeechLang {
	if (isSpeechLang(value ?? '')) {
		return value as SpeechLang;
	}
	return defaultSpeechLang;
}
