import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { paths } from '@/constants/paths';
import { createSupabaseBrowserClient } from '@/functions/supabase';
import type { ProfileRow } from '@/types/database';

export function useMemberSession() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<ProfileRow | null>(null);
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
				.select('id,email,name,created_at,updated_at')
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

	return { user, profile, isLoading, errorMessage };
}
