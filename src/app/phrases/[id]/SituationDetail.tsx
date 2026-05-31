'use client';

import { useRouter } from 'next/navigation';
import type { PhraseCollection } from '@/types/database';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { pickRandomIndices, maxLessonItems } from '@/functions/lesson';
import { saveLessonIndices } from '@/functions/lessonSession';
import { Button } from '@/components/Button/Button';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { Card } from '@/components/Card/Card';
import { Inner } from '@/components/Inner/Inner';
import { Crumbs } from '@/components/Crumbs/Crumbs';

type Props = {
	collection: PhraseCollection;
};

export function SituationDetail({ collection }: Props) {
	const router = useRouter();
	const canStart = collection.phrases.length > 0;

	function startLesson() {
		if (collection.phrases.length === 0) return;
		saveLessonIndices('phrase', collection.id, pickRandomIndices(collection.phrases.length));
		router.push(paths.phraseLesson(collection.id));
	}

	return (
		<Inner>
			<Crumbs items={[{ text: collection.title, href: paths.phrase(collection.id) }]} />
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					{collection.title}
				</Typography>
				<Button color="secondary" variant="button" onClick={startLesson} disabled={!canStart}>
					{`ランダム${maxLessonItems}問`}
				</Button>
				{collection.phrases.length > 0 && (
					<Stack size={2} variant="ul">
						{collection.phrases.map((phrase, index) => (
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
