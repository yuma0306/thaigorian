import { redirect } from 'next/navigation';
import { Inner } from '@/components/Inner/Inner';
import { MemberCategoryPageContent } from '@/components/MemberCategoryPageContent/MemberCategoryPageContent';
import { paths } from '@/constants/paths';
import { fetchMyCategoryList } from '@/functions/memberCategory/categorySpeechLang';
import { createSupabaseServerClient } from '@/functions/supabaseServer';

export default async function MemberCategoryPage() {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(paths.login);
	}

	const { categories, error } = await fetchMyCategoryList(supabase, user.id);

	return (
		<Inner>
			<MemberCategoryPageContent categories={categories} error={error} />
		</Inner>
	);
}
