export function isMissingPhraseNoteColumn(error: { message?: string } | null): boolean {
	return error?.message?.includes('note') ?? false;
}