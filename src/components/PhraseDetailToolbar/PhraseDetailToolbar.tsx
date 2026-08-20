import { Button } from '@/components/Button/Button';
import { PhraseLessonCheckbox } from '@/components/PhraseLessonCheckbox/PhraseLessonCheckbox';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { Typography } from '@/components/Typography/Typography';
import { maxLessonItems } from '@/functions/lesson';
import styles from './PhraseDetailToolbar.module.css';

type Props = {
	allSelected: boolean;
	canStart: boolean;
	hideThai: boolean;
	onAllSelectedChange: (checked: boolean) => void;
	onStartRandomLesson: () => void;
	onStartAllLesson: () => void;
	onToggleHideThai: () => void;
};

export function PhraseDetailToolbar({
	allSelected,
	canStart,
	hideThai,
	onAllSelectedChange,
	onStartRandomLesson,
	onStartAllLesson,
	onToggleHideThai
}: Props) {
	return (
		<>
			<div className={styles.toolbar}>
				<div className={styles.buttonRow}>
					<Button
						color="secondary"
						variant="button"
						marginInline={false}
						onClick={onStartRandomLesson}
						disabled={!canStart}
					>
						{`ランダム${maxLessonItems}問`}
					</Button>
					<Button
						color="secondary"
						variant="button"
						marginInline={false}
						onClick={onStartAllLesson}
						disabled={!canStart}
					>
						チェックした問題
					</Button>
				</div>
				<div className={styles.selectAllRow}>
					<PhraseLessonCheckbox
						checked={allSelected}
						onChange={(event) => onAllSelectedChange(event.target.checked)}
					>
						<Typography size={2} variant="span" color="primary" weight="bold" align="left">
							全問チェック
						</Typography>
					</PhraseLessonCheckbox>
				</div>
			</div>
			<ToggleRevealButton isFixed expanded={!hideThai} onClick={onToggleHideThai} />
		</>
	);
}
