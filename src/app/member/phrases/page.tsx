import { redirect } from 'next/navigation';
import { Inner } from '@/components/Inner/Inner';
import { MemberCategoryPageContent } from '@/components/MemberCategoryPageContent/MemberCategoryPageContent';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { MyCategoryListRow } from '@/types/database';

export default async function MemberCategoryPage() {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return (
			<Inner>
				<Typography size={3} variant="p" color="secondary" weight="bold" align="center">
					Supabaseの環境変数を設定してください。
				</Typography>
			</Inner>
		);
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(paths.login);
	}

	const { data: categories, error } = await supabase
		.from('my_categories')
		.select('id,title,slug,updated_at')
		.eq('user_id', user.id)
		.order('updated_at', { ascending: false })
		.returns<MyCategoryListRow[]>();

	return (
		<Inner>
			<MemberCategoryPageContent categories={categories} error={error} />
		</Inner>
	);
}
