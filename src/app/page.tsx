import { getSituations } from '@/functions/microcms';
import { CardImageList } from '@/components/CardImageList/CardImageList';
import { Stack } from '@/components/Stack/Stack';
import { CardImage } from '@/components/CardImage/CardImage';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { Inner } from '@/components/Inner/Inner';

export default async function HomePage() {
	const situations = await getSituations();

	return (
		<Inner>
			<Stack size={3} variant="div">
				<Stack size={2} variant="section">
					<Typography size={4} variant="h2" color="secondary" weight="bold" align="center">
						フレーズ
					</Typography>
					<CardImageList>
						{situations.map((situation) => (
							<CardImage
								key={situation.id}
								id={situation.id}
								href={paths.situation(situation.id)}
								title={situation.title}
							/>
						))}
					</CardImageList>
				</Stack>
			</Stack>
		</Inner>
	);
}
