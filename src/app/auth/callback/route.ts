import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { paths } from '@/constants/paths';
import { getSiteUrl } from '@/functions/siteUrl';

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const siteUrl = getSiteUrl();
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!code || !supabaseUrl || !supabaseKey) {
		return NextResponse.redirect(`${siteUrl}${paths.login}`);
	}

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
