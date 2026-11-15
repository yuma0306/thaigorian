import { MyPhraseDetail } from './MyPhraseDetail';
import { requireMyPhraseCategory } from '@/functions/myPhrases';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MyPhrasePage({ params }: Props) {
	const { id } = await params;
	const category = await requireMyPhraseCategory(id);
	return <MyPhraseDetail category={category} />;
}
