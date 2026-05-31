'use client';

import { createContext, useMemo, useState, type ReactNode } from 'react';
import { Modal, type ModalProps } from '@/components/Modal/Modal';

export type ModalContextValue = {
	openModal: (modalProps: ModalProps) => void;
	closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalProps, setModalProps] = useState<ModalProps | null>(null);

	const value = useMemo(
		() => ({
			openModal: (nextModalProps: ModalProps) => setModalProps(nextModalProps),
			closeModal: () => setModalProps(null)
		}),
		[]
	);

	return (
		<ModalContext.Provider value={value}>
			{children}
			{modalProps && (
				<Modal
					{...modalProps}
					onAgree={() => {
						modalProps.onAgree();
						setModalProps(null);
					}}
					onDisagree={() => {
						modalProps.onDisagree();
						setModalProps(null);
					}}
				/>
			)}
		</ModalContext.Provider>
	);
}
