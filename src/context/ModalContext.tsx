'use client';

import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

export type ModalContextValue = {
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalContent, setModalContent] = useState<ReactNode>(null);

	const openModal = useCallback((content: ReactNode) => {
		setModalContent(content);
	}, []);

	const closeModal = useCallback(() => {
		setModalContent(null);
	}, []);

	const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

	return (
		<ModalContext value={value}>
			{children}
			{modalContent}
		</ModalContext>
	);
}
