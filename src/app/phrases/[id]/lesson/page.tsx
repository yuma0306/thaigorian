import { notFound } from 'next/navigation';
import {
	getPhraseCollectionById,
	getPhraseCollectionSummaries
} from '@/functions/phraseCollections';
import { SituationLesson } from './SituationLesson';

export async function generateStaticParams() {
	const index = await getPhraseCollectionSummaries();
	return index.map((entry) => ({ id: entry.id }));
}

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PhraseCollectionLessonPage({ params }: Props) {
	const { id } = await params;
	const collection = await getPhraseCollectionById(id);

	if (!collection) {
		notFound();
	}

	return <SituationLesson collection={collection} />;
}
