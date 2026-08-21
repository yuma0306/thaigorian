import { PhraseLessonCheckbox } from '@/components/PhraseLessonCheckbox/PhraseLessonCheckbox';
import { Typography } from '@/components/Typography/Typography';
import styles from './PhraseDetailToolbar.module.css';

type ToolbarProps = {
	allSelected: boolean;
	onAllSelectedChange: (checked: boolean) => void;
};

export function PhraseDetailToolbar({ allSelected, onAllSelectedChange }: ToolbarProps) {
	return (
		<div className={styles.toolbar}>
			<PhraseLessonCheckbox
				checked={allSelected}
				onChange={(event) => onAllSelectedChange(event.target.checked)}
			>
				<Typography size={2} variant="span" color="primary" weight="bold" align="left">
					全問チェック
				</Typography>
			</PhraseLessonCheckbox>
		</div>
	);
}
