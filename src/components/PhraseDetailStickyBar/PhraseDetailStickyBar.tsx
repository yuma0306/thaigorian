import { Button } from '@/components/Button/Button';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { maxLessonItems } from '@/functions/lesson';
import styles from './PhraseDetailStickyBar.module.css';

type Props = {
	canStart: boolean;
	hideThai: boolean;
	onStartRandomLesson: () => void;
	onStartAllLesson: () => void;
	onToggleHideThai: () => void;
};

export function PhraseDetailStickyBar({
	canStart,
	hideThai,
	onStartRandomLesson,
	onStartAllLesson,
	onToggleHideThai
}: Props) {
	return (
		<div className={styles.stickyBar}>
			<Button
				color="secondary"
				variant="button"
				isFloating
				marginInline={false}
				onClick={onStartRandomLesson}
				disabled={!canStart}
			>
				{`ランダム${maxLessonItems}問`}
			</Button>
			<Button
				color="secondary"
				variant="button"
				isFloating
				marginInline={false}
				onClick={onStartAllLesson}
				disabled={!canStart}
			>
				選択した問題
			</Button>
			<ToggleRevealButton expanded={!hideThai} onClick={onToggleHideThai} />
		</div>
	);
}
