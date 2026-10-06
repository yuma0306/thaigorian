import { createSupabaseServerClient } from '@/functions/supabaseServer';

export async function getCurrentUser() {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error || !user) {
		return { supabase, userId: '', message: 'Please log in.' };
	}

	return { supabase, userId: user.id, message: '' };
}
