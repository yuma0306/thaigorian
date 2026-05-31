'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import type { MyPhraseCategoryView } from '@/functions/myPhrases';
import { pickRandomIndices, maxLessonItems } from '@/functions/lesson';
import { saveLessonIndices } from '@/functions/lessonSession';

type Props = {
	category: MyPhraseCategoryView;
};

export function MyPhraseDetail({ category }: Props) {
	const router = useRouter();
	const canStart = category.phrases.length > 0;

	function startLesson() {
		if (category.phrases.length === 0) return;
		saveLessonIndices('my-phrase', category.id, pickRandomIndices(category.phrases.length));
		router.push(paths.myPhraseLesson(category.id));
	}

	return (
		<Inner>
			<Crumbs items={[{ text: category.title, href: paths.myPhrase(category.id) }]} />
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					{category.title}
				</Typography>
				<Button color="secondary" variant="button" onClick={startLesson} disabled={!canStart}>
					{`ランダム${maxLessonItems}問`}
				</Button>
				{category.phrases.length > 0 && (
					<Stack size={2} variant="ul">
						{category.phrases.map((phrase, index) => (
							<Card
								key={`${phrase.fieldId}-${index}`}
								variant="li"
								borderColor="gray"
								hasBorderLeft
							>
								<PhraseCard phrase={phrase} />
							</Card>
						))}
					</Stack>
				)}
			</Stack>
		</Inner>
	);
}
