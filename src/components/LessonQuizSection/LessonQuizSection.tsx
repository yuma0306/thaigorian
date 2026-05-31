import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Progress } from '@/components/Progress/Progress';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { SkipButton } from '@/components/SkipButton/SkipButton';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import type { Phrase } from '@/types';

type Props = {
	currentIndex: number;
	total: number;
	phrase: Phrase;
	showAnswer: boolean;
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
	onShowAnswerChange,
	isCorrect,
	userInput,
	onUserInputChange,
	onAdvance,
	onSkip
}: Props) {
	return (
		<Stack size={3} variant="section">
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
				onShowAnswerChange={onShowAnswerChange}
			/>
			<Input isCorrect={isCorrect} userInput={userInput} onUserInputChange={onUserInputChange} />
			{isCorrect && (
				<Button variant="button" color="success" onClick={onAdvance}>
					次へ進む
				</Button>
			)}
			{!isCorrect && <SkipButton onClick={onSkip} />}
		</Stack>
	);
}
