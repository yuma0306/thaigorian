import { notFound } from 'next/navigation';
import { getSituationById } from '@/lib/microcms';
import { SituationLesson } from './SituationLesson';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function SituationLessonPage({ params }: Props) {
	const { id } = await params;
	const situation = await getSituationById(id);

	if (!situation) {
		notFound();
	}

	return <SituationLesson situation={situation} />;
}
