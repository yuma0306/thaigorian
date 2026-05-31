import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseEnv } from '@/functions/supabaseEnv';

export function createSupabaseBrowserClient() {
	const env = getSupabaseEnv();

	if (!env) {
		return null;
	}

	return createBrowserClient(env.url, env.key);
}
