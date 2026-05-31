import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
	appendPhrase,
	appendWord,
	insertPhraseAt,
	insertWordAt,
	movePhraseAt,
	moveWordAt,
	removePhraseById,
	removeWordById,
	toggleMenuState,
	updatePhraseField,
	updateWordField
} from '@/functions/phraseFieldMutations';
import type { MenuState, PhraseField, WordField } from '@/types/myCategoryRegister';

export function createPhraseFieldHandlers(
	setPhrases: Dispatch<SetStateAction<PhraseField[]>>,
	setOpenMenu: Dispatch<SetStateAction<MenuState>>
) {
	return {
		handleAddPhrase() {
			setPhrases(appendPhrase);
		},
		handleInsertPhrase(index: number) {
			setPhrases((currentPhrases) => insertPhraseAt(currentPhrases, index));
			setOpenMenu(null);
		},
		handleRemovePhrase(phraseId: string) {
			setPhrases((currentPhrases) => removePhraseById(currentPhrases, phraseId));
			setOpenMenu(null);
		},
		handleMovePhrase(fromIndex: number, toIndex: number) {
			setPhrases((currentPhrases) => movePhraseAt(currentPhrases, fromIndex, toIndex));
			setOpenMenu(null);
		},
		handleUpdatePhrase(
			phraseId: string,
			key: keyof Omit<PhraseField, 'id' | 'words'>,
			value: string
		) {
			setPhrases((currentPhrases) => updatePhraseField(currentPhrases, phraseId, key, value));
		},
		handleAddWord(phraseId: string) {
			setPhrases((currentPhrases) => appendWord(currentPhrases, phraseId));
		},
		handleInsertWord(phraseId: string, index: number) {
			setPhrases((currentPhrases) => insertWordAt(currentPhrases, phraseId, index));
			setOpenMenu(null);
		},
		handleRemoveWord(phraseId: string, wordId: string) {
			setPhrases((currentPhrases) => removeWordById(currentPhrases, phraseId, wordId));
			setOpenMenu(null);
		},
		handleMoveWord(phraseId: string, fromIndex: number, toIndex: number) {
			setPhrases((currentPhrases) => moveWordAt(currentPhrases, phraseId, fromIndex, toIndex));
			setOpenMenu(null);
		},
		handleUpdateWord(
			phraseId: string,
			wordId: string,
			key: keyof Omit<WordField, 'id'>,
			value: string
		) {
			setPhrases((currentPhrases) => updateWordField(currentPhrases, phraseId, wordId, key, value));
		},
		handleToggleMenu(event: MouseEvent<HTMLButtonElement>, nextMenu: Exclude<MenuState, null>) {
			event.preventDefault();
			event.stopPropagation();
			setOpenMenu((currentMenu) => toggleMenuState(currentMenu, nextMenu));
		}
	};
}
