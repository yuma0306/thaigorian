import { notFound } from 'next/navigation';
import { getPhraseCollectionById } from '@/functions/phraseCollections';
import { SituationDetail } from './SituationDetail';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PhraseCollectionPage({ params }: Props) {
	const { id } = await params;
	const collection = await getPhraseCollectionById(id);

	if (!collection) {
		notFound();
	}

	return <SituationDetail collection={collection} />;
}
