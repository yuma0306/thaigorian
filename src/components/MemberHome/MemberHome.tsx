'use client';

import { useRouter } from 'next/navigation';
import { CardImage } from '@/components/CardImage/CardImage';
import { CardImageList } from '@/components/CardImageList/CardImageList';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { createSupabaseBrowserClient } from '@/functions/supabase';

const menuItems = [
	{ id: 'member-phrases', title: 'フレーズ一覧', href: paths.memberPhrases },
	{ id: 'member-profile', title: '会員情報', href: paths.memberProfile }
] as const;

export function MemberHome() {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	async function handleSignOut() {
		await supabase.auth.signOut();
		router.replace(paths.home);
	}

	return (
		<Inner>
			<Crumbs items={[{ text: 'マイページ', href: paths.member }]} />
			<Stack size={2} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					マイページ
				</Typography>
				<CardImageList>
					{menuItems.map((item) => (
						<CardImage key={item.id} id={item.id} href={item.href} title={item.title} />
					))}
					<CardImage
						id="member-sign-out"
						variant="button"
						title="サインアウト"
						onClick={handleSignOut}
					/>
				</CardImageList>
			</Stack>
		</Inner>
	);
}
