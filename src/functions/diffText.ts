import { buildDiffParts, type DiffPart } from '@/functions/buildDiffParts';
import { normalizeThaiText } from '@/functions/normalizeThaiText';

export function diffText(input: string, expected: string): DiffPart[] {
	const inputGraphemes = splitGraphemes(normalizeThaiText(input));
	const expectedGraphemes = splitGraphemes(normalizeThaiText(expected));
	return mergeDiffParts(buildDiffParts(inputGraphemes, expectedGraphemes));
}

function splitGraphemes(text: string): string[] {
	if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
		const segmenter = new Intl.Segmenter('th', { granularity: 'grapheme' });
		return [...segmenter.segment(text)].map((segment) => segment.segment);
	}
	return [...text];
}

function mergeDiffParts(parts: DiffPart[]): DiffPart[] {
	return parts.reduce<DiffPart[]>((merged, part) => {
		const last = merged[merged.length - 1];
		if (last && last.type === part.type) {
			last.text += part.text;
			return merged;
		}
		return [...merged, { ...part }];
	}, []);
}
