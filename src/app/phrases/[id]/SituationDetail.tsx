'use client';

import { useRouter } from 'next/navigation';
import type { PhraseCollection } from '@/types/database';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { pickRandomIndices } from '@/functions/lesson';
import { saveLessonIndices } from '@/functions/lessonSession';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { Card } from '@/components/Card/Card';
import { Inner } from '@/components/Inner/Inner';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { PhraseDetailToolbar } from '@/components/PhraseDetailToolbar/PhraseDetailToolbar';
import { useThaiVisibility } from '@/hooks/useThaiVisibility';

type Props = {
	collection: PhraseCollection;
};

export function SituationDetail({ collection }: Props) {
	const router = useRouter();
	const { hideThai, toggleHideThai } = useThaiVisibility();
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
				<PhraseDetailToolbar
					canStart={canStart}
					hideThai={hideThai}
					onStartLesson={startLesson}
					onToggleHideThai={toggleHideThai}
				/>
				{collection.phrases.length > 0 && (
					<Stack size={2} variant="ul">
						{collection.phrases.map((phrase, index) => (
							<Card
								key={`${phrase.fieldId}-${index}`}
								variant="li"
								borderColor="gray"
								hasBorderLeft
							>
								<PhraseCard phrase={phrase} hideThai={hideThai} />
							</Card>
						))}
					</Stack>
				)}
			</Stack>
		</Inner>
	);
}
