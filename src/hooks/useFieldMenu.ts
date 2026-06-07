import { useCallback, useState, type MouseEvent } from 'react';
import type { MenuState } from '@/types/myCategoryRegister';

export function useFieldMenu() {
	const [openMenu, setOpenMenu] = useState<MenuState>(null);

	const handleToggleMenu = useCallback(
		(event: MouseEvent<HTMLButtonElement>, nextMenu: Exclude<MenuState, null>) => {
			event.preventDefault();
			event.stopPropagation();
			setOpenMenu((currentMenu) =>
				currentMenu?.type === nextMenu.type && currentMenu.id === nextMenu.id ? null : nextMenu
			);
		},
		[]
	);

	const handleCloseMenu = useCallback(() => {
		setOpenMenu(null);
	}, []);

	return { openMenu, handleToggleMenu, handleCloseMenu };
}
