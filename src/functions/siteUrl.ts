const defaultSiteUrl = 'http://localhost:3000';

export function getSiteUrl() {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

	return siteUrl.replace(/\/$/, '');
}
