const storageKey = (situationId: string) => `lesson:${situationId}`;

export const saveLessonIndices = (situationId: string, indices: number[]) => {
	sessionStorage.setItem(storageKey(situationId), JSON.stringify(indices));
};

export const loadLessonIndices = (situationId: string) => {
	const raw = sessionStorage.getItem(storageKey(situationId));
	if (!raw) return null;
	try {
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed) || !parsed.every((n) => typeof n === 'number')) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
};
