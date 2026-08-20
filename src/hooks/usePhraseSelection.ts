import { useMemo, useState } from 'react';

export function usePhraseSelection(phraseCount: number) {
	const [selected, setSelected] = useState<ReadonlySet<number>>(() => new Set());

	const selectedIndices = useMemo(() => [...selected].sort((a, b) => a - b), [selected]);
	const allSelected = phraseCount > 0 && selected.size === phraseCount;

	function isSelected(index: number) {
		return selected.has(index);
	}

	function togglePhrase(index: number) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	}

	function setAllPhrasesSelected(checked: boolean) {
		setSelected(
			checked ? new Set(Array.from({ length: phraseCount }, (_, index) => index)) : new Set()
		);
	}

	return { selectedIndices, allSelected, isSelected, togglePhrase, setAllPhrasesSelected };
}
