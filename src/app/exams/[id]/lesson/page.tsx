import { notFound } from 'next/navigation';
import { getExamById } from '@/lib/microcms';
import { ExamLesson } from './ExamLesson';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function ExamLessonPage({ params }: Props) {
	const { id } = await params;
	const exam = await getExamById(id);

	if (!exam) {
		notFound();
	}

	return <ExamLesson exam={exam} />;
}
