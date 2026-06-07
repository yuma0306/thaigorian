import styles from './CategoryRegisterActions.module.css';

type Props = {
	saveLabel: string;
	isSaving: boolean;
	onSaveClick: () => void;
};

export function CategoryRegisterActions({ saveLabel, isSaving, onSaveClick }: Props) {
	return (
		<div>
			<button className={styles.saveButton} type="button" disabled={isSaving} onClick={onSaveClick}>
				{isSaving ? '保存中...' : saveLabel}
			</button>
		</div>
	);
}
