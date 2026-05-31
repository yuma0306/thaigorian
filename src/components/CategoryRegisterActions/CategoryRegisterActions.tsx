import { paths } from '@/constants/paths';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';

type Props = {
	categoryId?: string;
	saveLabel: string;
	isSaving: boolean;
	isDeleting: boolean;
	message: string;
	onDelete?: () => void | Promise<void>;
};

export function CategoryRegisterActions({
	categoryId,
	saveLabel,
	isSaving,
	isDeleting,
	message,
	onDelete
}: Props) {
	return (
		<>
			<div className={styles.actions}>
				<a className={styles.secondaryLink} href={paths.memberPhrases}>
					戻る
				</a>
				{categoryId && onDelete && (
					<button
						className={styles.deleteButton}
						type="button"
						disabled={isDeleting || isSaving}
						onClick={onDelete}
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
