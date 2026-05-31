import type { MenuState, PhraseField, WordField } from '@/types/myCategoryRegister';
import { createPhrase, createWord } from '@/components/MyCategoryRegister/fieldFactory';

export function appendPhrase(phrases: PhraseField[]) {
	return [...phrases, createPhrase()];
}

export function insertPhraseAt(phrases: PhraseField[], index: number) {
	return [...phrases.slice(0, index), createPhrase(), ...phrases.slice(index)];
}

export function removePhraseById(phrases: PhraseField[], phraseId: string) {
	return phrases.filter((phrase) => phrase.id !== phraseId);
}

export function movePhraseAt(phrases: PhraseField[], fromIndex: number, toIndex: number) {
	if (toIndex < 0 || toIndex >= phrases.length) {
		return phrases;
	}

	const nextPhrases = [...phrases];
	const [movedPhrase] = nextPhrases.splice(fromIndex, 1);
	if (!movedPhrase) {
		return phrases;
	}

	nextPhrases.splice(toIndex, 0, movedPhrase);
	return nextPhrases;
}

export function updatePhraseField(
	phrases: PhraseField[],
	phraseId: string,
	key: keyof Omit<PhraseField, 'id' | 'words'>,
	value: string
) {
	return phrases.map((phrase) => (phrase.id === phraseId ? { ...phrase, [key]: value } : phrase));
}

export function appendWord(phrases: PhraseField[], phraseId: string) {
	return phrases.map((phrase) =>
		phrase.id === phraseId ? { ...phrase, words: [...phrase.words, createWord()] } : phrase
	);
}

export function insertWordAt(phrases: PhraseField[], phraseId: string, index: number) {
	return phrases.map((phrase) =>
		phrase.id === phraseId
			? {
					...phrase,
					words: [...phrase.words.slice(0, index), createWord(), ...phrase.words.slice(index)]
				}
			: phrase
	);
}

export function removeWordById(phrases: PhraseField[], phraseId: string, wordId: string) {
	return phrases.map((phrase) =>
		phrase.id === phraseId
			? { ...phrase, words: phrase.words.filter((word) => word.id !== wordId) }
			: phrase
	);
}

export function moveWordAt(
	phrases: PhraseField[],
	phraseId: string,
	fromIndex: number,
	toIndex: number
) {
	return phrases.map((phrase) => {
		if (phrase.id !== phraseId || toIndex < 0 || toIndex >= phrase.words.length) {
			return phrase;
		}

		const nextWords = [...phrase.words];
		const [movedWord] = nextWords.splice(fromIndex, 1);
		if (!movedWord) {
			return phrase;
		}

		nextWords.splice(toIndex, 0, movedWord);
		return { ...phrase, words: nextWords };
	});
}

export function updateWordField(
	phrases: PhraseField[],
	phraseId: string,
	wordId: string,
	key: keyof Omit<WordField, 'id'>,
	value: string
) {
	return phrases.map((phrase) =>
		phrase.id === phraseId
			? {
					...phrase,
					words: phrase.words.map((word) =>
						word.id === wordId ? { ...word, [key]: value } : word
					)
				}
			: phrase
	);
}

export function toggleMenuState(
	currentMenu: MenuState,
	nextMenu: Exclude<MenuState, null>
): MenuState {
	return currentMenu?.type === nextMenu.type && currentMenu.id === nextMenu.id ? null : nextMenu;
}
