import type { ExamQuestion } from '@/lib/types';
import { Card } from '@/lib/components/Card/Card';
import { Stack } from '@/lib/components/Stack/Stack';
import { ExamQuestionCardHead } from '@/lib/components/ExamQuestionCardHead/ExamQuestionCardHead';
import { ExamQuestionCardBody } from '@/lib/components/ExamQuestionCardBody/ExamQuestionCardBody';

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
