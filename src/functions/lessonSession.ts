export type LessonScope = 'situation' | 'my-phrase';

const storageKey = (scope: LessonScope, id: string) => `lesson:${scope}:${id}`;

export const saveLessonIndices = (scope: LessonScope, id: string, indices: number[]) => {
	sessionStorage.setItem(storageKey(scope, id), JSON.stringify(indices));
};

export const loadLessonIndices = (scope: LessonScope, id: string) => {
	const raw = sessionStorage.getItem(storageKey(scope, id));
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
