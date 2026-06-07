'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { MemberProfileCard } from '@/components/MemberProfileCard/MemberProfileCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { createSupabaseBrowserClient } from '@/functions/supabase';

type Props = {
	displayName: string;
	email: string;
	errorMessage: string;
};

export function MemberHome({ displayName, email, errorMessage }: Props) {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	async function handleSignOut() {
		await supabase.auth.signOut();
		router.replace(paths.home);
	}

	return (
		<Inner>
			<Crumbs items={[{ text: 'マイページ', href: paths.member }]} />
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					マイページ
				</Typography>
				<MemberProfileCard displayName={displayName} email={email} errorMessage={errorMessage} />
				<Button variant="a" color="secondary" href={paths.memberPhrases}>
					フレーズ一覧
				</Button>
				<Button variant="button" color="secondary" onClick={handleSignOut}>
					サインアウト
				</Button>
			</Stack>
		</Inner>
	);
}
