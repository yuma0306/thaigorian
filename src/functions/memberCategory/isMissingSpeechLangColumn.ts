export function isMissingSpeechLangColumn(error: { message?: string } | null): boolean {
	return error?.message?.includes('speech_lang') ?? false;
}
