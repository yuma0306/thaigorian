'use client';

import type { Situation } from '@/types';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { LessonQuizSection } from '@/components/LessonQuizSection/LessonQuizSection';
import { LessonResultSection } from '@/components/LessonResultSection/LessonResultSection';
import { paths } from '@/constants/paths';
import { usePhraseLesson } from '@/hooks/usePhraseLesson';

type Props = {
	situation: Situation;
};

export function SituationLesson({ situation }: Props) {
	const allPhrases = situation.phrases ?? [];
	const lesson = usePhraseLesson('phrase', situation.id, allPhrases);

	if (!lesson.ready) return null;

	const currentPhrase = lesson.currentPhrase;
	const showQuiz = Boolean(currentPhrase && !lesson.isFinished);
	const showResults = !showQuiz && lesson.phrases.length > 0;

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: situation.title ?? '', href: paths.phrase(situation.id) },
					{ text: 'レッスン', href: paths.phraseLesson(situation.id) }
				]}
			/>
			{showQuiz && currentPhrase && (
				<LessonQuizSection
					currentIndex={lesson.currentIndex}
					total={lesson.total}
					phrase={currentPhrase}
					showAnswer={lesson.showAnswer}
					onShowAnswerChange={lesson.handleShowAnswerChange}
					isCorrect={lesson.isCorrect}
					userInput={lesson.userInput}
					onUserInputChange={lesson.handleUserInputChange}
					onAdvance={lesson.handleAdvance}
					onSkip={lesson.handleSkipPhrase}
				/>
			)}
			{showResults && (
				<LessonResultSection
					correctCount={lesson.correctCount}
					total={lesson.total}
					results={lesson.results}
					backHref={paths.phrase(situation.id)}
				/>
			)}
		</Inner>
	);
}
