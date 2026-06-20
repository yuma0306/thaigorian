import { Button } from '@/components/Button/Button';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { maxLessonItems } from '@/functions/lesson';
import styles from './PhraseDetailToolbar.module.css';

type Props = {
	canStart: boolean;
	hideThai: boolean;
	onStartLesson: () => void;
	onToggleHideThai: () => void;
};

export function PhraseDetailToolbar({
	canStart,
	hideThai,
	onStartLesson,
	onToggleHideThai
}: Props) {
	return (
		<>
			<div className={styles.toolbar}>
				<Button color="secondary" variant="button" onClick={onStartLesson} disabled={!canStart}>
					{`ランダム${maxLessonItems}問`}
				</Button>
			</div>
			<ToggleRevealButton
				isFixed
				expanded={!hideThai}
				showLabel="👀"
				hideLabel="🙈"
				ariaLabel={hideThai ? 'タイ語を表示' : 'タイ語を隠す'}
				onClick={onToggleHideThai}
			/>
		</>
	);
}
