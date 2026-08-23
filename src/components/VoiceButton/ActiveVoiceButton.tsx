'use client';

import type { Phrase } from '@/types/database';
import { defaultSpeechLang } from '@/constants/speechLangs';
import { USE_GEMINI_TTS } from '@/constants/geminiTts';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { VoiceButtonV2 } from '@/components/VoiceButtonV2/VoiceButtonV2';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

type Props = {
	text: Phrase['phrase'];
	lang?: string;
};

function shouldUseGeminiTts(lang: string): boolean {
	return USE_GEMINI_TTS && lang.startsWith('th');
}

export function ActiveVoiceButton({ text, lang = defaultSpeechLang }: Props) {
	const isLoggedIn = useIsLoggedIn();
	if (shouldUseGeminiTts(lang) && isLoggedIn) {
		return <VoiceButtonV2 text={text} lang={lang} />;
	}

	return <VoiceButton text={text} lang={lang} />;
}
