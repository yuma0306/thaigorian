'use client';

import { useEffect, useMemo, useState } from 'react';
import type { LessonResult, Phrase, Situation } from '@/types';
import { orderItemsByIndices, pickRandomItems } from '@/functions/lesson';
import { loadLessonIndices } from '@/functions/lessonSession';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { paths } from '@/constants/paths';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { Progress } from '@/components/Progress/Progress';
import { Inner } from '@/components/Inner/Inner';
import { SkipButton } from '@/components/SkipButton/SkipButton';
import { ScoreCard } from '@/components/ScoreCard/ScoreCard';
import { Input } from '@/components/Input/Input';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { Card } from '@/components/Card/Card';
import { Crumbs } from '@/components/Crumbs/Crumbs';

type Props = {
	situation: Situation;
};

export function SituationLesson({ situation }: Props) {
	const allPhrases = situation.phrases ?? [];
	const [phrases, setPhrases] = useState<Phrase[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [results, setResults] = useState<LessonResult[]>([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const indices = loadLessonIndices(situation.id);
		setPhrases(
			indices && indices.length > 0
				? orderItemsByIndices(allPhrases, indices)
				: pickRandomItems(allPhrases)
		);
		setReady(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- phrases are loaded once per situation
	}, [situation.id]);

	const total = phrases.length;
	const currentPhrase = phrases[currentIndex];
	const isFinished = currentIndex >= total;
	const correctCount = useMemo(() => results.filter((r) => r.correct).length, [results]);

	function handleUserInputChange(value: string) {
		setUserInput(value);
		if (currentPhrase?.phrase !== undefined && value === currentPhrase.phrase) {
			setResults((prev) => [...prev, { phrase: currentPhrase, correct: true }]);
			setIsCorrect(true);
		}
	}

	function skipPhrase() {
		if (!currentPhrase) return;
		setResults((prev) => [...prev, { phrase: currentPhrase, correct: false }]);
		advance();
	}

	function advance() {
		setCurrentIndex((i) => i + 1);
		setUserInput('');
		setIsCorrect(false);
		setShowAnswer(false);
	}

	if (!ready) return null;

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: situation.title ?? '', href: paths.situation(situation.id) },
					{ text: 'レッスン', href: paths.lesson(situation.id) }
				]}
			/>
			{phrases.length > 0 && !isFinished ? (
				<Stack size={3} variant="section">
					<Stack size={1} variant="div">
						<Typography size={2} variant="p" color="dark" weight="bold" align="center">
							{currentIndex + 1} / {total}
						</Typography>
						<Progress value={currentIndex} max={total} />
					</Stack>
					<QuestionCard
						meaning={currentPhrase.meaning}
						phrase={currentPhrase.phrase}
						showAnswer={showAnswer}
						onShowAnswerChange={setShowAnswer}
					/>
					<Input
						isCorrect={isCorrect}
						userInput={userInput}
						onUserInputChange={handleUserInputChange}
					/>
					{isCorrect && (
						<Button variant="button" color="success" onClick={advance}>
							次へ進む
						</Button>
					)}
					{!isCorrect && <SkipButton onClick={skipPhrase} />}
				</Stack>
			) : phrases.length > 0 ? (
				<Stack size={3} variant="section">
					<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
						結果
					</Typography>
					<ScoreCard score={correctCount} total={total} />
					<Stack size={2} variant="ul">
						{results.map((result, index) => (
							<Card
								key={`${result.phrase.fieldId}-${index}`}
								variant="li"
								borderColor={result.correct ? 'success' : 'warning'}
								hasBorderLeft
							>
								<PhraseCard phrase={result.phrase} />
							</Card>
						))}
					</Stack>
					<Button variant="a" color="secondary" href={paths.situation(situation.id)}>
						戻る
					</Button>
				</Stack>
			) : null}
		</Inner>
	);
}
