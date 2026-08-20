import { buildLcsTable } from '@/functions/buildLcsTable';

type DiffPartType = 'equal' | 'delete' | 'insert';

export type DiffPart = {
	type: DiffPartType;
	text: string;
};

export function buildDiffParts(
	inputGraphemes: readonly string[],
	expectedGraphemes: readonly string[]
): DiffPart[] {
	const lcsLengths = buildLcsTable(inputGraphemes, expectedGraphemes);
	return collectDiffParts(
		inputGraphemes,
		expectedGraphemes,
		lcsLengths,
		inputGraphemes.length,
		expectedGraphemes.length
	);
}

function shouldInsertAt(
	inputIndex: number,
	expectedIndex: number,
	currentRow: readonly number[],
	previousRow: readonly number[]
): boolean {
	return (
		expectedIndex > 0 &&
		(inputIndex === 0 || currentRow[expectedIndex - 1]! >= previousRow[expectedIndex]!)
	);
}

function collectDiffParts(
	inputGraphemes: readonly string[],
	expectedGraphemes: readonly string[],
	lcsLengths: readonly number[][],
	inputIndex: number,
	expectedIndex: number
): DiffPart[] {
	if (inputIndex === 0 && expectedIndex === 0) {
		return [];
	}

	const currentRow = lcsLengths[inputIndex]!;
	const previousRow = lcsLengths[inputIndex - 1]!;
	const inputGrapheme = inputGraphemes[inputIndex - 1];
	const expectedGrapheme = expectedGraphemes[expectedIndex - 1];
	const hasEqualMatch = inputIndex > 0 && expectedIndex > 0 && inputGrapheme === expectedGrapheme;

	if (hasEqualMatch) {
		return [
			...collectDiffParts(
				inputGraphemes,
				expectedGraphemes,
				lcsLengths,
				inputIndex - 1,
				expectedIndex - 1
			),
			{ type: 'equal', text: inputGrapheme! }
		];
	}

	if (shouldInsertAt(inputIndex, expectedIndex, currentRow, previousRow)) {
		return [
			...collectDiffParts(
				inputGraphemes,
				expectedGraphemes,
				lcsLengths,
				inputIndex,
				expectedIndex - 1
			),
			{ type: 'insert', text: expectedGrapheme! }
		];
	}

	return [
		...collectDiffParts(
			inputGraphemes,
			expectedGraphemes,
			lcsLengths,
			inputIndex - 1,
			expectedIndex
		),
		{ type: 'delete', text: inputGrapheme! }
	];
}
