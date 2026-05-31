'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Inner } from '@/components/Inner/Inner';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { createSupabaseBrowserClient } from '@/functions/supabase';

type Profile = {
	id: string;
	email: string | null;
	name: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
};

export function MemberHome() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		async function loadMember() {
			const supabase = createSupabaseBrowserClient();

			if (!supabase) {
				setErrorMessage('Supabaseの環境変数を設定してください。');
				setIsLoading(false);
				return;
			}

			const {
				data: { user: currentUser },
				error: userError
			} = await supabase.auth.getUser();

			if (userError || !currentUser) {
				router.replace(paths.login);
				return;
			}

			setUser(currentUser);

			const { data: profileData, error: profileError } = await supabase
				.from('profiles')
				.select('id,email,name,avatar_url,created_at,updated_at')
				.eq('id', currentUser.id)
				.single();

			if (profileError) {
				setErrorMessage('会員情報を取得できませんでした。');
			} else {
				setProfile(profileData);
			}

			setIsLoading(false);
		}

		void loadMember();
	}, [router]);

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

	const displayName =
		profile?.name ?? user?.user_metadata.full_name ?? user?.user_metadata.name ?? '会員';
	const email = profile?.email ?? user?.email ?? '';

	return (
		<Inner>
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					マイページ
				</Typography>
				<Card borderColor="gray" hasBorderLeft={false} variant="div">
					<Stack size={2} variant="div">
						<Stack size={1} variant="dl">
							<Typography size={2} variant="dt" color="primary" weight="bold" align="left">
								名前
							</Typography>
							<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
								{displayName}
							</Typography>
							<Typography size={2} variant="dt" color="primary" weight="bold" align="left">
								メールアドレス
							</Typography>
							<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
								{email}
							</Typography>
						</Stack>
						{errorMessage && (
							<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
								{errorMessage}
							</Typography>
						)}
					</Stack>
				</Card>
				<Button variant="a" color="secondary" href={paths.memberCategory}>
					登録したカテゴリー
				</Button>
				<Button variant="button" color="secondary" onClick={handleSignOut}>
					サインアウト
				</Button>
			</Stack>
		</Inner>
	);
}
