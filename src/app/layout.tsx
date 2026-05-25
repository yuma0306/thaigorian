import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import '@/lib/styles/reset.css';
import '@/lib/styles/app.css';
import { Wrapper } from '@/lib/components/Wrapper/Wrapper';
import { Header } from '@/lib/components/Header/Header';
import { Main } from '@/lib/components/Main/Main';
import { Footer } from '@/lib/components/Footer/Footer';
import { siteData } from '@/lib/constants/siteData';

const siteUrl = `https://${siteData.domain}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteData.siteName,
	description:
		'マイペンサッパロットは、タイ語とタイ文字タイピングを学習するためのサイトです。',
	robots: { index: false, follow: false },
	alternates: { canonical: siteUrl },
	openGraph: {
		title: siteData.siteName,
		description:
			'マイペンサッパロットは、タイ語とタイ文字タイピングを学習するためのサイトです。',
		locale: 'ja_JP',
		type: 'website',
		url: siteUrl,
		siteName: siteData.siteName,
		images: [
			{
				url: '/ogp.png',
				alt: siteData.siteName,
				width: 1200,
				height: 630
			}
		]
	},
	icons: {
		icon: [
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon.svg', type: 'image/svg+xml' }
		],
		shortcut: '/favicon.ico',
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' }
	},
	manifest: '/site.webmanifest',
	appleWebApp: { title: siteData.siteName }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<body>
				<Wrapper>
					<Header />
					<Main>{children}</Main>
					<Footer />
				</Wrapper>
			</body>
		</html>
	);
}
