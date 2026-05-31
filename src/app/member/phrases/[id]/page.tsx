import { notFound, redirect } from 'next/navigation';
import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { paths } from '@/constants/paths';
import {
	fetchWordsByPhraseIds,
	groupWordsByPhraseId,
	mapPhraseRowsToFields
} from '@/functions/memberCategoryPhrases';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { MyCategoryRow, MyPhraseEditRow } from '@/types/database';
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

	const { data: category } = await supabase
		.from('my_categories')
		.select('id,title,slug')
		.eq('id', id)
		.eq('user_id', user.id)
		.single<MyCategoryRow>();

	if (!category) {
		notFound();
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,phrase,meaning,sort_order')
		.eq('category_id', category.id)
		.eq('user_id', user.id)
		.order('sort_order', { ascending: true })
		.returns<MyPhraseEditRow[]>();

	const phraseIds = (phraseRows ?? []).map((phrase) => phrase.id);
	const wordRows = await fetchWordsByPhraseIds(supabase, user.id, phraseIds);
	const wordsByPhraseId = groupWordsByPhraseId(wordRows);
	const phrases = mapPhraseRowsToFields(phraseRows ?? [], wordsByPhraseId);

	return (
		<MyCategoryRegister
			categoryId={category.id}
			initialContentId={category.slug ?? `category-${category.id}`}
			initialPhrases={phrases}
			initialTitle={category.title ?? ''}
			onDelete={deleteMyCategory}
			onSave={updateMyCategory.bind(null, category.id)}
			saveLabel="更新する"
		/>
	);
}
