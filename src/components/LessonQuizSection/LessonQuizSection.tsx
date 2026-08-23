import { Button } from '@/components/Button/Button';
import { InputText } from '@/components/InputText/InputText';
import { PhraseDiff } from '@/components/PhraseDiff/PhraseDiff';
import { Progress } from '@/components/Progress/Progress';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { splitTrailingThaiParticles } from '@/functions/lesson';
import type { Phrase } from '@/types/database';
import styles from './LessonQuizSection.module.css';

type Props = {
	currentIndex: number;
	total: number;
	phrase: Phrase;
	showAnswer: boolean;
	showDiff: boolean;
	speechLang: string;
	onShowAnswerChange: (value: boolean) => void;
	onShowDiffChange: (value: boolean) => void;
	isCorrect: boolean;
	userInput: string;
	onUserInputChange: (value: string) => void;
	onAdvance: () => void;
	onBack: () => void;
	onSkip: () => void;
};

export function LessonQuizSection({
	currentIndex,
	total,
	phrase,
	showAnswer,
	showDiff,
	speechLang,
	onShowAnswerChange,
	onShowDiffChange,
	isCorrect,
	userInput,
	onUserInputChange,
	onAdvance,
	onBack,
	onSkip
}: Props) {
	const { core, particle } = splitTrailingThaiParticles(phrase.phrase);

	return (
		<Stack size={2} variant="section">
			<Stack size={1} variant="div">
				<Typography size={2} variant="p" color="dark" weight="bold" align="center">
					{currentIndex + 1} / {total}
				</Typography>
				<Progress value={currentIndex} max={total} />
			</Stack>
			<QuestionCard
				meaning={phrase.meaning}
				phrase={phrase.phrase}
				showAnswer={showAnswer}
				showDiff={showDiff}
				speechLang={speechLang}
				onShowAnswerChange={onShowAnswerChange}
				onShowDiffChange={onShowDiffChange}
			/>
			<div className={styles.inputRow}>
				<div className={styles.inputWrap}>
					<InputText
						isCorrect={isCorrect}
						value={userInput}
						onChange={(e) => onUserInputChange(e.target.value)}
						placeholder="タイ文字を入力！"
						lang="th"
						disabled={isCorrect}
					/>
				</div>
				{particle && <span className={styles.particle}>{particle}</span>}
			</div>
			{showDiff && <PhraseDiff input={userInput} expected={core} particle={particle} />}
			{isCorrect && (
				<Button variant="button" color="success" onClick={onAdvance}>
					次へ進む
				</Button>
			)}
			{!isCorrect && (
				<div className={styles.actions}>
					<Button
						variant="button"
						color="secondary"
						isFloating
						marginInline={false}
						onClick={onBack}
						disabled={currentIndex === 0}
					>
						戻る
					</Button>
					<Button variant="button" color="secondary" isFloating marginInline={false} onClick={onSkip}>
						スキップ
					</Button>
				</div>
			)}
		</Stack>
	);
}
