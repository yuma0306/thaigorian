export const maxLessonItems = 10;

export const pickRandomItems = <T>(items: T[], max = maxLessonItems) => {
	return shuffle(items).slice(0, Math.min(max, items.length));
};

export const pickRandomIndices = (length: number, max = maxLessonItems) => {
	const indices = Array.from({ length }, (_, i) => i);
	return shuffle(indices).slice(0, Math.min(max, length));
};

export const orderItemsByIndices = <T>(items: T[], indices: number[]) => {
	return indices.filter((i) => i >= 0 && i < items.length).map((i) => items[i]);
};

function shuffle<T>(array: readonly T[]) {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
