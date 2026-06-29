import { Fragment } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card/Card';
import { Hr } from '@/components/Hr/Hr';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { groupBySpeechLang } from '@/functions/groupBySpeechLang';
import { paths } from '@/constants/paths';
import type { MyCategoryListItem } from '@/types/database';
import styles from './MemberCategoryList.module.css';

type Props = {
	categories: MyCategoryListItem[];
};

function formatDate(value: string) {
	return new Intl.DateTimeFormat('ja-JP', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Asia/Bangkok'
	}).format(new Date(value));
}

export function MemberCategoryList({ categories }: Props) {
	const groups = groupBySpeechLang(categories);

	return (
		<Stack size={3} variant="div">
			{groups.map((group, index) => (
				<Fragment key={group.value}>
					{index > 0 && <Hr />}
					<Stack size={2} variant="section">
						<Typography size={3} variant="h2" color="secondary" weight="bold" align="left">
							{group.label}
						</Typography>
						<Stack size={2} variant="ul">
							{group.items.map((category) => (
								<Card key={category.id} variant="li" borderColor="gray" hasBorderLeft={false}>
									<Link className={styles.link} href={paths.memberPhrasesDetail(category.id)}>
										<Typography size={3} variant="h2" color="primary" weight="bold" align="left">
											{category.title ?? '無題'}
										</Typography>
										<p className={styles.meta}>更新日時: {formatDate(category.updated_at)}</p>
									</Link>
								</Card>
							))}
						</Stack>
					</Stack>
				</Fragment>
			))}
		</Stack>
	);
}
