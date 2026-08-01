export const maxLessonItems = 5;

const trailingThaiParticles = ['ครับ', 'ค่ะ', 'นะ'] as const;

function matchTrailingParticle(text: string) {
	const particle = trailingThaiParticles.find((item) => text.endsWith(item));
	if (!particle) {
		return null;
	}
	return {
		particle,
		remaining: text.slice(0, -particle.length).trimEnd()
	};
}

function stripTrailingParticles(
	remaining: string,
	found: readonly string[]
): { core: string; particle: string } {
	const match = matchTrailingParticle(remaining);
	if (!match) {
		return { core: remaining, particle: found.join('') };
	}
	return stripTrailingParticles(match.remaining, [match.particle, ...found]);
}

export function splitTrailingThaiParticles(phrase: string | null | undefined): {
	core: string;
	particle: string;
} {
	if (!phrase) {
		return { core: '', particle: '' };
	}

	const original = phrase.trimEnd();
	const result = stripTrailingParticles(original, []);
	if (!result.core) {
		return { core: original, particle: '' };
	}
	return result;
}

export const pickRandomItems = <T>(items: T[], max = maxLessonItems) => {
	return shuffle(items).slice(0, Math.min(max, items.length));
};

export const pickRandomIndices = (length: number, max = maxLessonItems) => {
	const indices = Array.from({ length }, (_, i) => i);
	return shuffle(indices).slice(0, Math.min(max, length));
};

export const orderItemsByIndices = <T>(items: T[], indices: number[]) => {
	return indices.reduce<T[]>((orderedItems, index) => {
		const item = items[index];
		return item === undefined ? orderedItems : [...orderedItems, item];
	}, []);
};

function shuffle<T>(array: readonly T[]) {
	return [...array]
		.map((value) => ({ value, key: Math.random() }))
		.toSorted((a, b) => a.key - b.key)
		.map(({ value }) => value);
}
