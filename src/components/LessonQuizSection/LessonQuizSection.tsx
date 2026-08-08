import { Button } from '@/components/Button/Button';
import { InputText } from '@/components/InputText/InputText';
import { Progress } from '@/components/Progress/Progress';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { SkipButton } from '@/components/SkipButton/SkipButton';
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
	speechLang: string;
	onShowAnswerChange: (value: boolean) => void;
	isCorrect: boolean;
	userInput: string;
	onUserInputChange: (value: string) => void;
	onAdvance: () => void;
	onSkip: () => void;
};

export function LessonQuizSection({
	currentIndex,
	total,
	phrase,
	showAnswer,
	speechLang,
	onShowAnswerChange,
	isCorrect,
	userInput,
	onUserInputChange,
	onAdvance,
	onSkip
}: Props) {
	const { particle } = splitTrailingThaiParticles(phrase.phrase);

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
				speechLang={speechLang}
				onShowAnswerChange={onShowAnswerChange}
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
			{isCorrect && (
				<Button variant="button" color="success" onClick={onAdvance}>
					次へ進む
				</Button>
			)}
			{!isCorrect && <SkipButton onClick={onSkip} />}
		</Stack>
	);
}
