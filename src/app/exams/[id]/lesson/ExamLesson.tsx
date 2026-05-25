'use client';

import { useMemo, useState } from 'react';
import type { Exam, ExamResult } from '@/lib/types';
import { Stack } from '@/lib/components/Stack/Stack';
import { Typography } from '@/lib/components/Typography/Typography';
import { Button } from '@/lib/components/Button/Button';
import { paths } from '@/lib/constants/paths';
import { ExamQuizCard } from '@/lib/components/ExamQuizCard/ExamQuizCard';
import { Progress } from '@/lib/components/Progress/Progress';
import { Inner } from '@/lib/components/Inner/Inner';
import { SkipButton } from '@/lib/components/SkipButton/SkipButton';
import { ScoreCard } from '@/lib/components/ScoreCard/ScoreCard';
import { ExamQuestionCard } from '@/lib/components/ExamQuestionCard/ExamQuestionCard';
import { Crumbs } from '@/lib/components/Crumbs/Crumbs';

type Props = {
	exam: Exam;
};

export function ExamLesson({ exam }: Props) {
	const questions = exam.questions ?? [];
	const total = questions.length;

	const [currentIndex, setCurrentIndex] = useState(0);
	const [results, setResults] = useState<ExamResult[]>([]);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>(undefined);

	const currentQuestion = questions[currentIndex];
	const isFinished = currentIndex >= total;
	const correctCount = useMemo(() => results.filter((r) => r.correct).length, [results]);

	function selectOption(optionIndex: number) {
		if (selectedOptionIndex !== undefined) return;
		setSelectedOptionIndex(optionIndex);
		const correct = currentQuestion?.options?.[optionIndex]?.isCorrect ?? false;
		setResults((prev) => [
			...prev,
			{ question: currentQuestion, selectedOptionIndex: optionIndex, correct }
		]);
	}

	function skipQuestion() {
		if (selectedOptionIndex !== undefined) return;
		setResults((prev) => [
			...prev,
			{ question: currentQuestion, selectedOptionIndex: -1, correct: false }
		]);
		advance();
	}

	function advance() {
		setCurrentIndex((i) => i + 1);
		setSelectedOptionIndex(undefined);
	}

	return (
		<Inner>
			{exam.title && (
				<Crumbs
					items={[
						{ text: exam.title, href: paths.exam(exam.id) },
						{ text: '試験', href: paths.examLesson(exam.id) }
					]}
				/>
			)}
			{!isFinished ? (
				<Stack size={3} variant="section">
					<Stack size={1} variant="div">
						<Typography size={2} variant="p" color="dark" weight="bold" align="center">
							{currentIndex + 1} / {total}
						</Typography>
						<Progress value={currentIndex} max={total} />
					</Stack>
					{currentQuestion && (
						<ExamQuizCard
							key={currentIndex}
							question={currentQuestion}
							onSelect={selectOption}
							selectedIndex={selectedOptionIndex}
						/>
					)}
					{selectedOptionIndex !== undefined && (
						<Button variant="button" color="success" onClick={advance}>
							次へ進む
						</Button>
					)}
					{selectedOptionIndex === undefined && <SkipButton onClick={skipQuestion} />}
				</Stack>
			) : (
				<Stack size={3} variant="section">
					<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
						結果
					</Typography>
					<ScoreCard score={correctCount} total={total} />
					<Stack size={2} variant="ul">
						{results.map((result, index) =>
							result.question ? (
								<ExamQuestionCard
									key={`${result.question.fieldId}-${index}`}
									question={result.question}
									borderColor={result.correct ? 'success' : 'warning'}
								/>
							) : null
						)}
					</Stack>
					<Button variant="a" color="secondary" href={paths.exam(exam.id)}>
						戻る
					</Button>
				</Stack>
			)}
		</Inner>
	);
}
