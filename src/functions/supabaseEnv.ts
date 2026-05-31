export function getSupabaseEnv() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !key) {
		return null;
	}

	return { url, key };
}

export function assertSupabaseEnv() {
	const env = getSupabaseEnv();

	if (!env) {
		throw new Error('Supabase is not configured');
	}

	return env;
}
