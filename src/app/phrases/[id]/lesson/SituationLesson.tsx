'use client';

import type { PhraseCollection } from '@/types/database';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { LessonQuizSection } from '@/components/LessonQuizSection/LessonQuizSection';
import { LessonResultSection } from '@/components/LessonResultSection/LessonResultSection';
import { paths } from '@/constants/paths';
import { usePhraseLesson } from '@/hooks/usePhraseLesson';

type Props = {
	collection: PhraseCollection;
};

export function SituationLesson({ collection }: Props) {
	const lesson = usePhraseLesson('phrase', collection.id, collection.phrases);

	if (!lesson.ready) return null;

	const currentPhrase = lesson.currentPhrase;
	const showQuiz = Boolean(currentPhrase && !lesson.isFinished);
	const showResults = !showQuiz && lesson.phrases.length > 0;

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: collection.title, href: paths.phrase(collection.id) },
					{ text: 'レッスン', href: paths.phraseLesson(collection.id) }
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
					backHref={paths.phrase(collection.id)}
				/>
			)}
		</Inner>
	);
}
