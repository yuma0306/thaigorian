import { paths } from '@/constants/paths';
import { requireMyPhraseCategory } from '@/functions/myPhrases';
import { MyPhraseLesson } from './MyPhraseLesson';
import { Inner } from '@/components/Inner/Inner';
import { Crumbs } from '@/components/Crumbs/Crumbs';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MyPhraseLessonPage({ params }: Props) {
	const { id } = await params;
	const category = await requireMyPhraseCategory(id);

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: category.title, href: paths.myPhrase(category.id) },
					{ text: 'Lesson', href: paths.myPhraseLesson(category.id) }
				]}
			/>
			<MyPhraseLesson category={category} />
		</Inner>
	);
}
