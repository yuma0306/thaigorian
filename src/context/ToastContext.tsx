'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Toast, type ToastVariant } from '@/components/Toast/Toast';

const toastDurationMs = 3000;

export type ToastContextValue = {
	showToast: (message: string, variant?: ToastVariant) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);

	const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
		setToast({ message, variant });
	}, []);

	useEffect(() => {
		if (!toast) {
			return;
		}
		const timerId = window.setTimeout(() => {
			setToast(null);
		}, toastDurationMs);
		return () => {
			window.clearTimeout(timerId);
		};
	}, [toast]);

	const value = useMemo(() => ({ showToast }), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{toast && <Toast message={toast.message} variant={toast.variant} />}
		</ToastContext.Provider>
	);
}
