/** タイ語の結合文字（母音・声調など）の並び順を揃える */
export function normalizeThaiText(text: string): string {
	return text.normalize('NFC');
}
