'use client';

import { useRouter } from 'next/navigation';
import type { Situation } from '@/types';
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
	situation: Situation;
};

export function SituationDetail({ situation }: Props) {
	const router = useRouter();
	const canStart = (situation.phrases?.length ?? 0) > 0;

	function startLesson() {
		const all = situation.phrases ?? [];
		if (all.length === 0) return;
		saveLessonIndices(situation.id, pickRandomIndices(all.length));
		router.push(paths.lesson(situation.id));
	}

	return (
		<Inner>
			<Crumbs items={[{ text: situation.title ?? '', href: paths.situation(situation.id) }]} />
			<Stack size={3} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					{situation.title ?? ''}
				</Typography>
				<Button color="secondary" variant="button" onClick={startLesson} disabled={!canStart}>
					{`ランダム${maxLessonItems}問`}
				</Button>
				{situation.phrases && situation.phrases.length > 0 && (
					<Stack size={2} variant="ul">
						{situation.phrases.map((phrase, index) => (
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
