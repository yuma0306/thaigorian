import { Button } from '@/components/Button/Button';
import { MemberCategoryList } from '@/components/MemberCategoryList/MemberCategoryList';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import type { MyCategoryListRow } from '@/types/database';
import styles from '@/app/member/phrases/page.module.css';

type Props = {
	categories: MyCategoryListRow[] | null;
	error: Error | null;
};

function MemberCategoryStatus({ error, isEmpty }: { error: Error | null; isEmpty: boolean }) {
	if (error) {
		return (
			<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
				データを取得できませんでした。
			</Typography>
		);
	}
	if (isEmpty) {
		return (
			<Typography size={2} variant="p" color="dark" weight="normal" align="center">
				登録はまだありません。
			</Typography>
		);
	}
}

export function MemberCategoryPageContent({ categories, error }: Props) {
	const isEmpty = !error && (categories?.length ?? 0) === 0;
	const list = !error && categories && categories.length > 0 ? categories : null;

	return (
		<Stack size={3} variant="section">
			<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
				フレーズ一覧
			</Typography>
			<div className={styles.actions}>
				<Button variant="a" color="secondary" href={paths.memberPhrasesRegister}>
					フレーズを登録
				</Button>
			</div>
			<MemberCategoryStatus error={error} isEmpty={isEmpty} />
			{list && <MemberCategoryList categories={list} />}
		</Stack>
	);
}
