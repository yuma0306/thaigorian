import type { ExamQuestion } from '@/types';
import { Card } from '@/components/Card/Card';
import { Stack } from '@/components/Stack/Stack';
import { ExamQuestionCardHead } from '@/components/ExamQuestionCardHead/ExamQuestionCardHead';
import { ExamQuestionCardBody } from '@/components/ExamQuestionCardBody/ExamQuestionCardBody';

type Props = {
	question: ExamQuestion;
	borderColor: 'gray' | 'success' | 'warning';
};

export function ExamQuestionCard({ question, borderColor }: Props) {
	return (
		<Card variant="li" borderColor={borderColor} hasBorderLeft>
			<Stack size={2} variant="div">
				<ExamQuestionCardHead question={question} />
				<ExamQuestionCardBody question={question} />
			</Stack>
		</Card>
	);
}
