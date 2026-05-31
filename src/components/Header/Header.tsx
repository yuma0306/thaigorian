'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Inner } from '@/components/Inner/Inner';
import { Logo } from '@/components/Logo/Logo';
import { paths } from '@/constants/paths';
import { createSupabaseBrowserClient } from '@/functions/supabase';
import styles from './Header.module.css';

export function Header() {
	const supabase = createSupabaseBrowserClient();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const linkHref = isLoggedIn ? paths.member : paths.login;
	const linkText = isLoggedIn ? 'マイページ' : 'ログイン';

	useEffect(() => {
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
	}, [supabase]);

	return (
		<header className={styles.header}>
			<Inner>
				<div className={styles.inner}>
					<Logo />
					<Link className={styles.signupLink} href={linkHref}>
						{linkText}
					</Link>
				</div>
			</Inner>
		</header>
	);
}
