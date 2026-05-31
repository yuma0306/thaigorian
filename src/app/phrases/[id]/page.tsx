import { notFound } from 'next/navigation';
import {
	getPhraseCollectionById,
	getPhraseCollectionSummaries
} from '@/functions/phraseCollections';
import { SituationDetail } from './SituationDetail';

export async function generateStaticParams() {
	const index = await getPhraseCollectionSummaries();
	return index.map((entry) => ({ id: entry.id }));
}

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
