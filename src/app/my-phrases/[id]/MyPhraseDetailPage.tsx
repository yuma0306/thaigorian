'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inner } from '@/components/Inner/Inner';
import { Spinner } from '@/components/Spinner/Spinner';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { fetchMyPhraseCategoryView } from '@/functions/fetchMyPhraseCategoryView';
import { createSupabaseBrowserClient } from '@/functions/supabase';
import type { MyPhraseCategoryView } from '@/types/myPhrases';
import { MyPhraseDetail } from './MyPhraseDetail';

export function MyPhraseDetailPage({ categoryId }: { categoryId: string }) {
	const router = useRouter();
	const [state, setState] = useState<LoadState>({ status: 'loading' });

	useEffect(() => {
		const controller = new AbortController();
		async function load() {
			const supabase = createSupabaseBrowserClient();
			const {
				data: { user }
			} = await supabase.auth.getUser();
			if (controller.signal.aborted) {
				return;
			}
			if (!user) {
				router.replace(paths.login);
				return;
			}
			const category = await fetchMyPhraseCategoryView(supabase, user.id, categoryId);
			if (controller.signal.aborted) {
				return;
			}
			if (!category) {
				setState({ status: 'notfound' });
				return;
			}
			setState({ status: 'ready', category });
		}
		load();
		return () => {
			controller.abort();
		};
	}, [categoryId, router]);

	if (state.status === 'loading') {
		return (
			<Inner>
				<Spinner />
			</Inner>
		);
	}
	if (state.status === 'notfound') {
		return (
			<Inner>
				<Typography size={4} variant="h1" color="secondary" weight="bold" align="center">
					ページが見つかりません
				</Typography>
			</Inner>
		);
	}
	return <MyPhraseDetail category={state.category} />;
}

type LoadState =
	| { status: 'loading' }
	| { status: 'ready'; category: MyPhraseCategoryView }
	| { status: 'notfound' };
