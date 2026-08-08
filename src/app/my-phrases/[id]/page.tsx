import { MyPhraseDetailPage } from './MyPhraseDetailPage';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MyPhrasePage({ params }: Props) {
	const { id } = await params;
	return <MyPhraseDetailPage categoryId={id} />;
}
