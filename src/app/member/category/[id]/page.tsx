import { notFound, redirect } from 'next/navigation';
import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { paths } from '@/constants/paths';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import { deleteMyCategory, updateMyCategory } from '../actions';

type Props = {
	params: Promise<{ id: string }>;
};

type CategoryRow = {
	id: string;
	title: string | null;
	slug: string | null;
};

type PhraseRow = {
	id: string;
	phrase: string | null;
	meaning: string | null;
	ipa: string | null;
	sort_order: number | null;
};

type WordRow = {
	id: string;
	phrase_id: string;
	word: string | null;
	meaning: string | null;
	sort_order: number | null;
};

export default async function MemberCategoryDetailPage({ params }: Props) {
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

	const { data: category } = await supabase
		.from('my_categories')
		.select('id,title,slug')
		.eq('id', id)
		.eq('user_id', user.id)
		.single<CategoryRow>();

	if (!category) {
		notFound();
	}

	const { data: phraseRows } = await supabase
		.from('my_phrases')
		.select('id,phrase,meaning,ipa,sort_order')
		.eq('category_id', category.id)
		.eq('user_id', user.id)
		.order('sort_order', { ascending: true })
		.returns<PhraseRow[]>();

	const phraseIds = (phraseRows ?? []).map((phrase) => phrase.id);
	const { data: wordRows } =
		phraseIds.length > 0
			? await supabase
					.from('my_words')
					.select('id,phrase_id,word,meaning,sort_order')
					.eq('user_id', user.id)
					.in('phrase_id', phraseIds)
					.order('sort_order', { ascending: true })
					.returns<WordRow[]>()
			: { data: [] as WordRow[] };

	const wordsByPhraseId = new Map<string, WordRow[]>();
	(wordRows ?? []).forEach((word) => {
		wordsByPhraseId.set(word.phrase_id, [...(wordsByPhraseId.get(word.phrase_id) ?? []), word]);
	});

	const phrases = (phraseRows ?? []).map((phrase) => ({
		id: phrase.id,
		phrase: phrase.phrase ?? '',
		meaning: phrase.meaning ?? '',
		ipa: phrase.ipa ?? '',
		words: (wordsByPhraseId.get(phrase.id) ?? []).map((word) => ({
			id: word.id,
			word: word.word ?? '',
			meaning: word.meaning ?? ''
		}))
	}));

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
