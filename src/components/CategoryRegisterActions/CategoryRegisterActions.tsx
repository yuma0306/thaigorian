import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';

type Props = {
	categoryId?: string;
	saveLabel: string;
	isSaving: boolean;
	isDeleting: boolean;
	message: string;
	onDeleteClick?: () => void;
};

export function CategoryRegisterActions({
	categoryId,
	saveLabel,
	isSaving,
	isDeleting,
	message,
	onDeleteClick
}: Props) {
	return (
		<>
			<div className={styles.actions}>
				{categoryId && onDeleteClick && (
					<button
						className={styles.deleteButton}
						type="button"
						disabled={isDeleting || isSaving}
						onClick={onDeleteClick}
					>
						{isDeleting ? '削除中...' : '削除する'}
					</button>
				)}
				<button className={styles.saveButton} type="submit" disabled={isSaving}>
					{isSaving ? '保存中...' : saveLabel}
				</button>
			</div>
			{message && (
				<p className={styles.statusMessage} role="status">
					{message}
				</p>
			)}
		</>
	);
}
