import { Button } from '@/components/Button/Button';
import styles from './CategoryRegisterActions.module.css';

type Props = {
	saveLabel: string;
	isSaving: boolean;
	onSaveClick: () => void;
};

export function CategoryRegisterActions({ saveLabel, isSaving, onSaveClick }: Props) {
	return (
		<div className={styles.sticky}>
			<Button variant="button" color="secondary" disabled={isSaving} onClick={onSaveClick}>
				{isSaving ? '保存中...' : saveLabel}
			</Button>
		</div>
	);
}
