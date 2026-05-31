import { useEffect, useMemo, useState } from 'react';
import type { LessonResult, Phrase } from '@/types/database';
import { orderItemsByIndices, pickRandomItems } from '@/functions/lesson';
import { loadLessonIndices, type LessonScope } from '@/functions/lessonSession';

export function usePhraseLesson(scope: LessonScope, lessonId: string, allPhrases: Phrase[]) {
	const [phrases, setPhrases] = useState<Phrase[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [results, setResults] = useState<LessonResult[]>([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const indices = loadLessonIndices(scope, lessonId);
		// eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is available only after hydration
		setPhrases(
			indices && indices.length > 0
				? orderItemsByIndices(allPhrases, indices)
				: pickRandomItems(allPhrases)
		);
		setReady(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- phrases are loaded once per lesson
	}, [lessonId, scope]);

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

	function handleSkipPhrase() {
		if (!currentPhrase) return;
		setResults((prev) => [...prev, { phrase: currentPhrase, correct: false }]);
		handleAdvance();
	}

	function handleAdvance() {
		setCurrentIndex((i) => i + 1);
		setUserInput('');
		setIsCorrect(false);
		setShowAnswer(false);
	}

	function handleShowAnswerChange(value: boolean) {
		setShowAnswer(value);
	}

	return {
		ready,
		phrases,
		total,
		currentIndex,
		currentPhrase,
		isFinished,
		correctCount,
		userInput,
		isCorrect,
		showAnswer,
		handleShowAnswerChange,
		results,
		handleUserInputChange,
		handleSkipPhrase,
		handleAdvance
	};
}
