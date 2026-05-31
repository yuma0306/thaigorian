'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Inner } from '@/components/Inner/Inner';
import { MemberProfileCard } from '@/components/MemberProfileCard/MemberProfileCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { getMemberDisplayName, getMemberEmail } from '@/functions/memberDisplayName';
import { createSupabaseBrowserClient } from '@/functions/supabase';
import { useMemberSession } from '@/hooks/useMemberSession';

export function MemberHome() {
	const router = useRouter();
	const { user, profile, isLoading, errorMessage } = useMemberSession();

	async function handleSignOut() {
		const supabase = createSupabaseBrowserClient();
		if (!supabase) return;

		await supabase.auth.signOut();
		router.replace(paths.home);
	}

	if (isLoading) {
		return (
			<Inner>
				<Typography size={3} variant="p" color="dark" weight="bold" align="center">
					会員情報を読み込み中です。
				</Typography>
			</Inner>
		);
	}

	return (
		<Inner>
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					マイページ
				</Typography>
				<MemberProfileCard
					displayName={getMemberDisplayName(profile, user)}
					email={getMemberEmail(profile, user)}
					errorMessage={errorMessage}
				/>
				<Button variant="a" color="secondary" href={paths.memberPhrases}>
					フレーズを登録
				</Button>
				<Button variant="button" color="secondary" onClick={handleSignOut}>
					サインアウト
				</Button>
			</Stack>
		</Inner>
	);
}
