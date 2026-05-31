import { createSupabaseServerClient } from '@/functions/supabaseServer';

export async function getCurrentUser() {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return { supabase: null, userId: '', message: 'Supabaseの環境変数を設定してください。' };
	}

	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error || !user) {
		return { supabase, userId: '', message: 'ログインしてください。' };
	}

	return { supabase, userId: user.id, message: '' };
}
