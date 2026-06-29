import { getPhraseCollectionSummaries } from '@/functions/phraseCollections';
import { getMyPhraseCategorySummaries } from '@/functions/myPhrases';
import { SpeechLangCardImageList } from '@/components/SpeechLangCardImageList/SpeechLangCardImageList';
import { Stack } from '@/components/Stack/Stack';
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
						{myPhraseCategories.length > 0 && (
							<SpeechLangCardImageList items={myPhraseCategories} getHref={paths.myPhrase} />
						)}
					</Stack>
				)}
				<Stack size={2} variant="section">
					<Typography size={4} variant="h2" color="secondary" weight="bold" align="center">
						フレーズ
					</Typography>
					{phraseCollections.length > 0 && (
						<SpeechLangCardImageList items={phraseCollections} getHref={paths.phrase} />
					)}
				</Stack>
			</Stack>
		</Inner>
	);
}
