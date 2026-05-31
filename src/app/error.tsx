'use client';

import { useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import { Inner } from '@/components/Inner/Inner';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';

type Props = {
	error: Error & { digest?: string };
	unstable_retry: () => void;
};

export default function Error({ error, unstable_retry }: Props) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Inner>
			<Stack size={2} variant="section">
				<Typography size={4} variant="h1" color="secondary" weight="bold" align="center">
					サイトを表示できません
				</Typography>
				<Typography size={2} variant="p" color="dark" weight="normal" align="center">
					一時的なエラーが発生しています。しばらくしてから再度お試しください。
				</Typography>
				<Button variant="button" color="secondary" onClick={() => unstable_retry()}>
					もう一度試す
				</Button>
			</Stack>
		</Inner>
	);
}
