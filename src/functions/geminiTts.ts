import 'server-only';
import { GEMINI_TTS_MODEL, GEMINI_TTS_VOICE } from '@/constants/geminiTts';
import { pcmToWav } from '@/functions/pcmToWav';

type GeminiInlineData = {
	inlineData?: {
		data?: string;
	};
};

type GeminiResponse = {
	candidates?: {
		content?: {
			parts?: GeminiInlineData[];
		};
	}[];
};

function resolveLanguageCode(lang: string): string {
	if (lang.startsWith('th')) {
		return 'th-TH';
	}
	if (lang.startsWith('en')) {
		return 'en-US';
	}
	return lang;
}

function getGeminiApiKey(): string {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error('GEMINI_API_KEY is not configured');
	}
	return apiKey;
}

function buildRequestBody(text: string, languageCode: string) {
	return {
		contents: [{ parts: [{ text }] }],
		generationConfig: {
			responseModalities: ['AUDIO'],
			speechConfig: {
				languageCode,
				voiceConfig: {
					prebuiltVoiceConfig: { voiceName: GEMINI_TTS_VOICE }
				}
			}
		}
	};
}

function extractPcmBase64(data: GeminiResponse): string {
	const base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
	if (!base64Audio) {
		throw new Error('Gemini TTS returned no audio data');
	}
	return base64Audio;
}

async function requestGeminiTts(text: string, lang: string): Promise<string> {
	const apiKey = getGeminiApiKey();
	const languageCode = resolveLanguageCode(lang);

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(buildRequestBody(text, languageCode))
		}
	);

	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(`Gemini TTS failed (${response.status}): ${errorBody}`);
	}

	const data = (await response.json()) as GeminiResponse;
	return extractPcmBase64(data);
}

export async function synthesizeSpeechWav(text: string, lang: string): Promise<Buffer> {
	const base64Audio = await requestGeminiTts(text, lang);
	return pcmToWav(Buffer.from(base64Audio, 'base64'));
}
