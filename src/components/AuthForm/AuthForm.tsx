'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { getSiteUrl } from '@/functions/siteUrl';
import { createSupabaseBrowserClient } from '@/functions/supabase';
import styles from './AuthForm.module.css';

type Props = {
	title: string;
	description: string;
	submitLabel: string;
	alternateHref: string;
	alternateLabel: string;
	initialErrorMessage?: string;
};

export function AuthForm({
	title,
	description,
	submitLabel,
	alternateHref,
	alternateLabel,
	initialErrorMessage = ''
}: Props) {
	const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage('');

		const supabase = createSupabaseBrowserClient();
		if (!supabase) {
			setErrorMessage('Supabaseの環境変数を設定してください。');
			return;
		}

		setIsSubmitting(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getSiteUrl()}${paths.authCallback}`
			}
		});

		if (error) {
			setErrorMessage('Googleログインを開始できませんでした。');
			setIsSubmitting(false);
		}
	}

	return (
		<div className={styles.authForm}>
			<Card borderColor="gray" hasBorderLeft={false} variant="div">
				<form onSubmit={handleSubmit}>
					<Stack size={3} variant="div">
						<Stack size={1} variant="div">
							<Typography size={4} variant="h1" color="primary" weight="bold" align="center">
								{title}
							</Typography>
							<Typography size={2} variant="p" color="dark" weight="normal" align="center">
								{description}
							</Typography>
						</Stack>
						<Button variant="button" color="secondary" type="submit" disabled={isSubmitting}>
							{isSubmitting ? '移動中...' : submitLabel}
						</Button>
						{errorMessage && (
							<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
								{errorMessage}
							</Typography>
						)}
						<Link className={styles.link} href={alternateHref}>
							{alternateLabel}
						</Link>
					</Stack>
				</form>
			</Card>
		</div>
	);
}
