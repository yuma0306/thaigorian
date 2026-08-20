import { Button } from '@/components/Button/Button';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { maxLessonItems } from '@/functions/lesson';
import styles from './PhraseDetailToolbar.module.css';

type Props = {
	canStart: boolean;
	hideThai: boolean;
	onStartRandomLesson: () => void;
	onStartAllLesson: () => void;
	onToggleHideThai: () => void;
};

export function PhraseDetailToolbar({
	canStart,
	hideThai,
	onStartRandomLesson,
	onStartAllLesson,
	onToggleHideThai
}: Props) {
	return (
		<>
			<div className={styles.toolbar}>
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
					全問
				</Button>
			</div>
			<ToggleRevealButton isFixed expanded={!hideThai} onClick={onToggleHideThai} />
		</>
	);
}
