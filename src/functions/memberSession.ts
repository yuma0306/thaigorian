import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { paths } from '@/constants/paths';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import type { ProfileRow } from '@/types/database';

export async function getMemberSession(): Promise<{
	user: User;
	profile: ProfileRow | null;
	profileError: boolean;
}> {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser();

	if (userError || !user) {
		redirect(paths.login);
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('id,email,name,created_at,updated_at')
		.eq('id', user.id)
		.single<ProfileRow>();

	return {
		user,
		profile: profile ?? null,
		profileError: Boolean(profileError)
	};
}
