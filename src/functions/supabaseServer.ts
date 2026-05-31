import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from '@/functions/supabaseEnv';

export async function createSupabaseServerClient() {
	const env = getSupabaseEnv();

	if (!env) {
		return null;
	}

	const cookieStore = await cookies();

	return createServerClient(env.url, env.key, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options);
					});
				} catch {
					// Server Component では Cookie を書き込めない（Server Action / Route Handler のみ可）
				}
			}
		}
	});
}
