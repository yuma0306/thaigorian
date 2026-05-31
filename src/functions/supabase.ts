import { createBrowserClient } from '@supabase/ssr';
import { assertSupabaseEnv } from '@/functions/supabaseEnv';

export function createSupabaseBrowserClient() {
	const env = assertSupabaseEnv();
	return createBrowserClient(env.url, env.key);
}
