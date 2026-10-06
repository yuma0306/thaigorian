import { Button } from '@/components/Button/Button';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { MemberCategoryList } from '@/components/MemberCategoryList/MemberCategoryList';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import type { MyCategoryListItem } from '@/types/database';
import styles from './MemberCategoryPageContent.module.css';

type Props = {
	categories: MyCategoryListItem[] | null;
	error: Error | null;
};

function MemberCategoryStatus({ error, isEmpty }: { error: Error | null; isEmpty: boolean }) {
	if (error) {
		return (
			<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
				Could not load data.
			</Typography>
		);
	}
	if (isEmpty) {
		return (
			<Typography size={2} variant="p" color="dark" weight="normal" align="center">
				Nothing here yet.
			</Typography>
		);
	}
}

export function MemberCategoryPageContent({ categories, error }: Props) {
	const isEmpty = !error && (categories?.length ?? 0) === 0;
	const list = !error && categories && categories.length > 0 ? categories : null;

	return (
		<Stack size={3} variant="section">
			<Crumbs
				items={[
					{ text: 'My Page', href: paths.member },
					{ text: 'Phrases', href: paths.memberPhrases }
				]}
			/>
			<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
				Phrases
			</Typography>
			<div className={styles.actions}>
				<Button variant="a" color="secondary" href={paths.memberPhrasesRegister}>
					Add phrases
				</Button>
			</div>
			<MemberCategoryStatus error={error} isEmpty={isEmpty} />
			{list && <MemberCategoryList categories={list} />}
		</Stack>
	);
}
