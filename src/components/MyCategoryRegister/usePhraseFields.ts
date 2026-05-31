import { useMemo, useState } from 'react';
import { createPhraseFieldHandlers } from './phraseFieldHandlers';
import type { MenuState, PhraseField } from '@/types/myCategoryRegister';

export function usePhraseFields(initialPhrases: PhraseField[]) {
	const [phrases, setPhrases] = useState<PhraseField[]>(initialPhrases);
	const [openMenu, setOpenMenu] = useState<MenuState>(null);
	const handlers = useMemo(() => createPhraseFieldHandlers(setPhrases, setOpenMenu), []);

	return { phrases, openMenu, ...handlers };
}
