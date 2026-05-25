import { notFound } from 'next/navigation';
import { getSituationById } from '@/lib/microcms';
import { SituationDetail } from './SituationDetail';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function SituationPage({ params }: Props) {
	const { id } = await params;
	const situation = await getSituationById(id);

	if (!situation) {
		notFound();
	}

	return <SituationDetail situation={situation} />;
}
