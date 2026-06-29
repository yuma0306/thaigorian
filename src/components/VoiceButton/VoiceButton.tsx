'use client';

import { useEffect, useState } from 'react';
import type { Phrase } from '@/types/database';
import { defaultSpeechLang } from '@/constants/speechLangs';
import { SoundIcon } from '@/components/Icon/SoundIcon';
import styles from './VoiceButton.module.css';

type Props = {
	text: Phrase['phrase'];
	lang?: string;
};

export function VoiceButton({ text, lang = defaultSpeechLang }: Props) {
	const [isSpeaking, setIsSpeaking] = useState(false);

	function speak(value: string) {
		if (isSpeaking) return;
		setIsSpeaking(true);
		const utterance = new SpeechSynthesisUtterance(value);
		utterance.lang = lang;
		utterance.onend = () => setIsSpeaking(false);
		utterance.onerror = () => setIsSpeaking(false);
		speechSynthesis.speak(utterance);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setIsSpeaking(speechSynthesis.speaking);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	if (!text) return null;

	return (
		<button
			type="button"
			className={styles.button}
			onClick={() => speak(text)}
			disabled={isSpeaking}
		>
			<SoundIcon />
		</button>
	);
}
