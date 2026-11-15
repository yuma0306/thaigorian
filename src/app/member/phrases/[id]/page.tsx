import { notFound, redirect } from 'next/navigation';
import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { paths } from '@/constants/paths';
import {
	fetchOwnedCategoryPhrases,
	groupWordsByPhraseId,
	mapPhraseRowsToFields
} from '@/functions/memberCategoryPhrases';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import { deleteMyCategory } from '@/functions/memberCategory/deleteMyCategory';
import { updateMyCategory } from '@/functions/memberCategory/updateMyCategory';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MemberCategoryDetailPage({ params }: Props) {
	const { id } = await params;
	const supabase = await createSupabaseServerClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(paths.login);
	}

	const owned = await fetchOwnedCategoryPhrases(supabase, user.id, id);

	if (!owned) {
		notFound();
	}

	const phrases = mapPhraseRowsToFields(owned.phraseRows, groupWordsByPhraseId(owned.wordRows));

	return (
		<MyCategoryRegister
			categoryId={owned.category.id}
			initialContentId={owned.category.slug ?? `category-${owned.category.id}`}
			initialPhrases={phrases}
			initialTitle={owned.category.title ?? ''}
			initialSpeechLang={owned.category.speechLang}
			onDelete={deleteMyCategory}
			onSave={updateMyCategory.bind(null, owned.category.id)}
			saveLabel="Update"
		/>
	);
}
