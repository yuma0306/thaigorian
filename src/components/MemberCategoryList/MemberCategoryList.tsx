import Link from 'next/link';
import { Card } from '@/components/Card/Card';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import type { MyCategoryListRow } from '@/types/database';
import styles from '@/app/member/category/page.module.css';

type Props = {
	categories: MyCategoryListRow[];
};

function formatDate(value: string) {
	return new Intl.DateTimeFormat('ja-JP', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Asia/Bangkok'
	}).format(new Date(value));
}

export function MemberCategoryList({ categories }: Props) {
	return (
		<ul className={styles.list}>
			{categories.map((category) => (
				<Card key={category.id} variant="li" borderColor="gray" hasBorderLeft={false}>
					<Link className={styles.link} href={paths.memberCategoryDetail(category.id)}>
						<Typography size={3} variant="h2" color="primary" weight="bold" align="left">
							{category.title ?? '無題のカテゴリー'}
						</Typography>
						<p className={styles.meta}>更新日時: {formatDate(category.updated_at)}</p>
					</Link>
				</Card>
			))}
		</ul>
	);
}
