'use client';

import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { LessonQuizSection } from '@/components/LessonQuizSection/LessonQuizSection';
import { LessonResultSection } from '@/components/LessonResultSection/LessonResultSection';
import { paths } from '@/constants/paths';
import type { MyPhraseCategoryView } from '@/functions/myPhrases';
import { usePhraseLesson } from '@/hooks/usePhraseLesson';

type Props = {
	category: MyPhraseCategoryView;
};

export function MyPhraseLesson({ category }: Props) {
	const lesson = usePhraseLesson('my-phrase', category.id, category.phrases);

	if (!lesson.ready) return null;

	const currentPhrase = lesson.currentPhrase;
	const showQuiz = Boolean(currentPhrase && !lesson.isFinished);
	const showResults = !showQuiz && lesson.phrases.length > 0;

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: category.title, href: paths.myPhrase(category.id) },
					{ text: 'レッスン', href: paths.myPhraseLesson(category.id) }
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
					backHref={paths.myPhrase(category.id)}
				/>
			)}
		</Inner>
	);
}
