import { getPhraseCollectionSummaries } from '@/functions/phraseCollections';
import { getMyPhraseCategorySummaries } from '@/functions/myPhrases';
import { CardImageList } from '@/components/CardImageList/CardImageList';
import { Stack } from '@/components/Stack/Stack';
import { CardImage } from '@/components/CardImage/CardImage';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { Inner } from '@/components/Inner/Inner';

export default async function HomePage() {
	const [phraseCollections, myPhraseCategories] = await Promise.all([
		getPhraseCollectionSummaries(),
		getMyPhraseCategorySummaries()
	]);

	return (
		<Inner>
			<Stack size={3} variant="div">
				{myPhraseCategories !== null && (
					<Stack size={2} variant="section">
						<Typography size={4} variant="h2" color="secondary" weight="bold" align="center">
							マイフレーズ
						</Typography>
						<CardImageList>
							{myPhraseCategories.map((category) => (
								<CardImage
									key={category.id}
									id={category.id}
									href={paths.myPhrase(category.id)}
									title={category.title}
								/>
							))}
						</CardImageList>
					</Stack>
				)}
				<Stack size={2} variant="section">
					<Typography size={4} variant="h2" color="secondary" weight="bold" align="center">
						フレーズ
					</Typography>
					<CardImageList>
						{phraseCollections.map((collection) => (
							<CardImage
								key={collection.id}
								id={collection.id}
								href={paths.phrase(collection.id)}
								title={collection.title}
							/>
						))}
					</CardImageList>
				</Stack>
			</Stack>
		</Inner>
	);
}
