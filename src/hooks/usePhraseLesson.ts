import { useEffect, useMemo, useState } from 'react';
import type { LessonResult, Phrase } from '@/types/database';
import {
	orderItemsByIndices,
	pickRandomItems,
	splitTrailingThaiParticles
} from '@/functions/lesson';
import { loadLessonIndices, type LessonScope } from '@/functions/lessonSession';
import { normalizeThaiText } from '@/functions/normalizeThaiText';

function replaceResultAt(prev: LessonResult[], index: number, result: LessonResult) {
	const next = [...prev];
	next[index] = result;
	return next;
}

function previousAnswer(phrase: Phrase | undefined, result: LessonResult | undefined) {
	const core = phrase?.phrase ? splitTrailingThaiParticles(phrase.phrase).core : '';
	return {
		isCorrect: result?.correct ?? false,
		userInput: result?.correct ? core : ''
	};
}

function loadLessonPhrases(scope: LessonScope, lessonId: string, allPhrases: Phrase[]) {
	const indices = loadLessonIndices(scope, lessonId);
	return indices && indices.length > 0
		? orderItemsByIndices(allPhrases, indices)
		: pickRandomItems(allPhrases);
}

export function usePhraseLesson(scope: LessonScope, lessonId: string, allPhrases: Phrase[]) {
	const [phrases, setPhrases] = useState<Phrase[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [results, setResults] = useState<LessonResult[]>([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [showDiff, setShowDiff] = useState(false);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is available only after hydration
		setPhrases(loadLessonPhrases(scope, lessonId, allPhrases));
		setReady(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- phrases are loaded once per lesson
	}, [lessonId, scope]);

	const total = phrases.length;
	const currentPhrase = phrases[currentIndex];
	const isFinished = currentIndex >= total;
	const correctCount = useMemo(() => results.filter((r) => r.correct).length, [results]);

	function handleUserInputChange(value: string) {
		setUserInput(value);
		if (currentPhrase?.phrase === undefined || currentPhrase.phrase === null) {
			return;
		}
		const { core } = splitTrailingThaiParticles(currentPhrase.phrase);
		if (normalizeThaiText(value) === core) {
			setResults((prev) => replaceResultAt(prev, currentIndex, { phrase: currentPhrase, correct: true }));
			setIsCorrect(true);
		}
	}

	function handleGoBack() {
		if (currentIndex === 0) return;
		const previousIndex = currentIndex - 1;
		const previous = previousAnswer(phrases[previousIndex], results[previousIndex]);
		setCurrentIndex(previousIndex);
		setIsCorrect(previous.isCorrect);
		setUserInput(previous.userInput);
		setShowAnswer(false);
		setShowDiff(false);
	}

	function handleSkipPhrase() {
		if (!currentPhrase) return;
		setResults((prev) => replaceResultAt(prev, currentIndex, { phrase: currentPhrase, correct: false }));
		handleAdvance();
	}

	function handleAdvance() {
		setCurrentIndex((i) => i + 1);
		setUserInput('');
		setIsCorrect(false);
		setShowAnswer(false);
		setShowDiff(false);
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
		showDiff,
		handleShowAnswerChange: setShowAnswer,
		handleShowDiffChange: setShowDiff,
		results,
		handleUserInputChange,
		handleSkipPhrase,
		handleGoBack,
		handleAdvance
	};
}
