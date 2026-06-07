import styles from './CategoryRegisterActions.module.css';

type Props = {
	categoryId?: string;
	saveLabel: string;
	isSaving: boolean;
	isDeleting: boolean;
	message: string;
	onSaveClick: () => void;
	onDeleteClick?: () => void;
};

export function CategoryRegisterActions({
	categoryId,
	saveLabel,
	isSaving,
	isDeleting,
	message,
	onSaveClick,
	onDeleteClick
}: Props) {
	return (
		<>
			<div>
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
				<button
					className={styles.saveButton}
					type="button"
					disabled={isSaving}
					onClick={onSaveClick}
				>
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
