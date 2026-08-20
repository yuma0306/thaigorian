export function buildLcsTable(
	inputGraphemes: readonly string[],
	expectedGraphemes: readonly string[]
): number[][] {
	const initialRow = Array<number>(expectedGraphemes.length + 1).fill(0);
	return inputGraphemes.reduce<number[][]>(
		(rows, _, index) => {
			const inputIndex = index + 1;
			const previousRow = rows[index]!;
			return [...rows, createLcsRow(inputIndex, inputGraphemes, expectedGraphemes, previousRow)];
		},
		[initialRow]
	);
}

function createLcsRow(
	inputIndex: number,
	inputGraphemes: readonly string[],
	expectedGraphemes: readonly string[],
	previousRow: readonly number[]
): number[] {
	return expectedGraphemes.reduce<number[]>(
		(row, expectedGrapheme, expectedIndex) => {
			const expectedCellIndex = expectedIndex + 1;
			const inputGrapheme = inputGraphemes[inputIndex - 1];
			if (inputGrapheme === expectedGrapheme) {
				row[expectedCellIndex] = previousRow[expectedCellIndex - 1]! + 1;
				return row;
			}
			row[expectedCellIndex] = Math.max(
				previousRow[expectedCellIndex]!,
				row[expectedCellIndex - 1]!
			);
			return row;
		},
		Array<number>(expectedGraphemes.length + 1).fill(0)
	);
}
