import styles from './CategoryDeleteButton.module.css';

type Props = {
	isSaving: boolean;
	isDeleting: boolean;
	onClick: () => void;
};

export function CategoryDeleteButton({ isSaving, isDeleting, onClick }: Props) {
	return (
		<button
			className={styles.deleteButton}
			type="button"
			disabled={isDeleting || isSaving}
			onClick={onClick}
		>
			{isDeleting ? '削除中...' : '削除する'}
		</button>
	);
}
