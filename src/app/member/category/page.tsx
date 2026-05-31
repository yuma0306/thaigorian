import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Inner } from '@/components/Inner/Inner';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { createSupabaseServerClient } from '@/functions/supabaseServer';
import styles from './page.module.css';

type CategoryRow = {
	id: string;
	title: string | null;
	slug: string | null;
	updated_at: string;
};

function formatDate(value: string) {
	return new Intl.DateTimeFormat('ja-JP', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Asia/Bangkok'
	}).format(new Date(value));
}

export default async function MemberCategoryPage() {
	const supabase = await createSupabaseServerClient();

	if (!supabase) {
		return (
			<Inner>
				<Typography size={3} variant="p" color="secondary" weight="bold" align="center">
					Supabaseの環境変数を設定してください。
				</Typography>
			</Inner>
		);
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(paths.login);
	}

	const { data: categories, error } = await supabase
		.from('my_categories')
		.select('id,title,slug,updated_at')
		.eq('user_id', user.id)
		.order('updated_at', { ascending: false })
		.returns<CategoryRow[]>();

	return (
		<Inner>
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					登録したカテゴリー一覧
				</Typography>
				<div className={styles.actions}>
					<Button variant="a" color="secondary" href={paths.myCategoryRegister}>
						カテゴリーを追加
					</Button>
				</div>
				{error && (
					<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
						カテゴリーを取得できませんでした。
					</Typography>
				)}
				{!error && (categories?.length ?? 0) === 0 && (
					<Typography size={2} variant="p" color="dark" weight="normal" align="center">
						登録したカテゴリーはまだありません。
					</Typography>
				)}
				{!error && categories && categories.length > 0 && (
					<ul className={styles.list}>
						{categories.map((category) => (
							<Card
								key={category.id}
								variant="li"
								borderColor="gray"
								hasBorderLeft={false}
							>
								<Link className={styles.link} href={paths.memberCategoryDetail(category.id)}>
									<Typography size={3} variant="h2" color="primary" weight="bold" align="left">
										{category.title ?? '無題のカテゴリー'}
									</Typography>
									<p className={styles.meta}>更新日時: {formatDate(category.updated_at)}</p>
								</Link>
							</Card>
						))}
					</ul>
				)}
			</Stack>
		</Inner>
	);
}
