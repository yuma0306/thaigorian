import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error';

type Props = {
	message: string;
	variant: ToastVariant;
};

export function Toast({ message, variant }: Props) {
	return (
		<div
			className={styles.toast}
			data-variant={variant}
			role={variant === 'error' ? 'alert' : 'status'}
			aria-live={variant === 'error' ? 'assertive' : 'polite'}
		>
			{message}
		</div>
	);
}
