import { notFound } from 'next/navigation';
import { getPhraseCollectionById } from '@/functions/phraseCollections';
import { SituationLesson } from './SituationLesson';

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
