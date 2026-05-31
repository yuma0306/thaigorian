import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { paths } from '@/constants/paths';
import { assertSupabaseEnv } from '@/functions/supabaseEnv';
import { getSiteUrl } from '@/functions/siteUrl';

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const siteUrl = getSiteUrl();
	if (!code) {
		return NextResponse.redirect(`${siteUrl}${paths.login}`);
	}

	const { url: supabaseUrl, key: supabaseKey } = assertSupabaseEnv();
	const response = NextResponse.redirect(`${siteUrl}${paths.member}`);
	const supabase = createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					response.cookies.set(name, value, options);
				});
			}
		}
	});

	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		return NextResponse.redirect(
			`${siteUrl}${paths.login}?error=${encodeURIComponent(error.message)}`
		);
	}

	return response;
}
