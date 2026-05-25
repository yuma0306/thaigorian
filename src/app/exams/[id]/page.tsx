import { notFound } from 'next/navigation';
import { getExamById } from '@/lib/microcms';
import { Stack } from '@/lib/components/Stack/Stack';
import { Typography } from '@/lib/components/Typography/Typography';
import { Button } from '@/lib/components/Button/Button';
import { ExamQuestionCard } from '@/lib/components/ExamQuestionCard/ExamQuestionCard';
import { paths } from '@/lib/constants/paths';
import { Inner } from '@/lib/components/Inner/Inner';
import { Crumbs } from '@/lib/components/Crumbs/Crumbs';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function ExamPage({ params }: Props) {
	const { id } = await params;
	const exam = await getExamById(id);

	if (!exam) {
		notFound();
	}

	return (
		<Inner>
			{exam.title && <Crumbs items={[{ text: exam.title, href: paths.exam(exam.id) }]} />}
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					{exam.title}
				</Typography>
				<Button color="secondary" variant="a" href={paths.examLesson(exam.id)}>
					試験をスタート
				</Button>
				<Stack size={2} variant="ul">
					{exam.questions?.map((question) => (
						<ExamQuestionCard key={question.fieldId} question={question} borderColor="gray" />
					))}
				</Stack>
			</Stack>
		</Inner>
	);
}
