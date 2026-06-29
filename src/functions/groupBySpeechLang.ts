import { speechLangOptions, type SpeechLang } from '@/constants/speechLangs';

export function groupBySpeechLang<T extends { speechLang: SpeechLang }>(items: T[]) {
	return speechLangOptions
		.map((option) => ({
			...option,
			items: items.filter((item) => item.speechLang === option.value)
		}))
		.filter((group) => group.items.length > 0);
}
