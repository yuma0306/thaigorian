import { notFound, redirect } from 'next/navigation';
import { paths } from '@/constants/paths';
import { getMyPhraseCategoryById } from '@/functions/myPhrases';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import { MyPhraseLesson } from './MyPhraseLesson';
import { Inner } from '@/components/Inner/Inner';
import { Crumbs } from '@/components/Crumbs/Crumbs';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MyPhraseLessonPage({ params }: Props) {
	const { id } = await params;
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		notFound();
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(paths.login);
	}

	const category = await getMyPhraseCategoryById(id);

	if (!category) {
		notFound();
	}

	return (
		<Inner>
			<Crumbs
				items={[
					{ text: category.title, href: paths.myPhrase(category.id) },
					{ text: 'レッスン', href: paths.myPhraseLesson(category.id) }
				]}
			/>
			<MyPhraseLesson category={category} />
		</Inner>
	);
}
