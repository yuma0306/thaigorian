import { Button } from '@/components/Button/Button';
import { ScrollToEdgeButton } from '@/components/ScrollToEdgeButton/ScrollToEdgeButton';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { maxLessonItems } from '@/functions/lesson';
import styles from './PhraseDetailStickyBar.module.css';

type Props = {
	canStartSelected: boolean;
	hasPhrases: boolean;
	hideThai: boolean;
	hideMeaning?: boolean;
	onStartRandomLesson: () => void;
	onStartAllLesson: () => void;
	onToggleHideThai: () => void;
	onToggleHideMeaning?: () => void;
};

export function PhraseDetailStickyBar({
	canStartSelected,
	hasPhrases,
	hideThai,
	hideMeaning = false,
	onStartRandomLesson,
	onStartAllLesson,
	onToggleHideThai,
	onToggleHideMeaning
}: Props) {
	return (
		<div className={styles.stickyBar}>
			<div className={styles.toggles}>
				<ScrollToEdgeButton direction="top" />
				<ScrollToEdgeButton direction="bottom" />
				<ToggleRevealButton
					expanded={!hideThai}
					{...(onToggleHideMeaning ? { caption: 'Phrase' } : {})}
					onClick={onToggleHideThai}
				/>
				{onToggleHideMeaning && (
					<ToggleRevealButton
						expanded={!hideMeaning}
						caption="Meaning"
						hideLabel="Hide meaning"
						showLabel="Show meaning"
						onClick={onToggleHideMeaning}
					/>
				)}
			</div>
			<div className={styles.actions}>
				<Button
					color="secondary"
					variant="button"
					isFloating
					marginInline={false}
					onClick={onStartRandomLesson}
					disabled={!hasPhrases}
				>
					{`ランダム${maxLessonItems}問`}
				</Button>
				<Button
					color="secondary"
					variant="button"
					isFloating
					marginInline={false}
					onClick={onStartAllLesson}
					disabled={!canStartSelected}
				>
					選択した問題
				</Button>
			</div>
		</div>
	);
}
