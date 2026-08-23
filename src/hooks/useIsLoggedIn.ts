'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/functions/supabase';

export function useIsLoggedIn(): boolean {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const supabase = createSupabaseBrowserClient();

		void supabase.auth
			.getUser()
			.then(({ data: { user } }) => {
				setIsLoggedIn(Boolean(user));
			})
			.catch(() => {
				setIsLoggedIn(false);
			});

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setIsLoggedIn(Boolean(session?.user));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return isLoggedIn;
}
