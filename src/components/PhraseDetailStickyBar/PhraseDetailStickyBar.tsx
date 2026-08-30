import { Button } from '@/components/Button/Button';
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
				<ToggleRevealButton
					expanded={!hideThai}
					{...(onToggleHideMeaning ? { caption: 'フレーズ' } : {})}
					onClick={onToggleHideThai}
				/>
				{onToggleHideMeaning && (
					<ToggleRevealButton
						expanded={!hideMeaning}
						caption="意味"
						hideLabel="意味を隠す"
						showLabel="意味を表示"
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
