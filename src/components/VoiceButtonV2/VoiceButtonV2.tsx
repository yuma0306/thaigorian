'use client';

import { useEffect, useRef, useState } from 'react';
import type { Phrase } from '@/types/database';
import { defaultSpeechLang } from '@/constants/speechLangs';
import { SoundIcon } from '@/components/Icon/SoundIcon';
import { getOrFetchTtsAudio } from '@/components/VoiceButtonV2/ttsAudioCache';
import styles from './VoiceButtonV2.module.css';

type Props = {
	text: Phrase['phrase'];
	lang?: string;
};

export function VoiceButtonV2({ text, lang = defaultSpeechLang }: Props) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const objectUrlRef = useRef<string | null>(null);

	function clearAudio() {
		audioRef.current?.pause();
		audioRef.current = null;

		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = null;
		}
	}

	function speakWithBrowser(value: string, onDone: () => void) {
		const utterance = new SpeechSynthesisUtterance(value);
		utterance.lang = lang;
		utterance.onend = onDone;
		utterance.onerror = onDone;
		speechSynthesis.speak(utterance);
	}

	async function speak(value: string) {
		if (isSpeaking || !value) {
			return;
		}

		setIsSpeaking(true);
		clearAudio();

		try {
			const blob = await getOrFetchTtsAudio(value, lang);
			const objectUrl = URL.createObjectURL(blob);
			objectUrlRef.current = objectUrl;

			const audio = new Audio(objectUrl);
			audioRef.current = audio;
			audio.onended = () => {
				clearAudio();
				setIsSpeaking(false);
			};
			audio.onerror = () => {
				clearAudio();
				speakWithBrowser(value, () => setIsSpeaking(false));
			};

			await audio.play();
		} catch {
			clearAudio();
			speakWithBrowser(value, () => setIsSpeaking(false));
		}
	}

	useEffect(() => {
		return () => {
			clearAudio();
		};
	}, []);

	if (!text) {
		return null;
	}

	return (
		<button
			type="button"
			className={styles.button}
			onClick={() => {
				void speak(text);
			}}
			disabled={isSpeaking}
		>
			<SoundIcon />
		</button>
	);
}
