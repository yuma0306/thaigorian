'use client';

import { useRouter } from 'next/navigation';
import { resolveSpeechLang } from '@/constants/speechLangs';
import type { PhraseCollection } from '@/types/database';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { allLessonIndices, pickRandomIndices } from '@/functions/lesson';
import { saveLessonIndices } from '@/functions/lessonSession';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { Card } from '@/components/Card/Card';
import { Inner } from '@/components/Inner/Inner';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { PhraseDetailCardSelect } from '@/components/PhraseDetailCardSelect/PhraseDetailCardSelect';
import { PhraseDetailStickyBar } from '@/components/PhraseDetailStickyBar/PhraseDetailStickyBar';
import { PhraseDetailToolbar } from '@/components/PhraseDetailToolbar/PhraseDetailToolbar';
import { usePhraseSelection } from '@/hooks/usePhraseSelection';
import { useThaiVisibility } from '@/hooks/useThaiVisibility';

type Props = {
	collection: PhraseCollection;
};

export function SituationDetail({ collection }: Props) {
	const router = useRouter();
	const { hideThai, toggleHideThai } = useThaiVisibility();
	const { selectedIndices, allSelected, isSelected, togglePhrase, setAllPhrasesSelected } =
		usePhraseSelection(collection.phrases.length);
	const canStart = selectedIndices.length > 0;
	const speechLang = resolveSpeechLang(collection.speechLang);

	function startRandomLesson() {
		if (selectedIndices.length === 0) return;
		saveLessonIndices('phrase', collection.id, pickRandomIndices(selectedIndices));
		router.push(paths.phraseLesson(collection.id));
	}

	function startAllLesson() {
		if (selectedIndices.length === 0) return;
		saveLessonIndices('phrase', collection.id, allLessonIndices(selectedIndices));
		router.push(paths.phraseLesson(collection.id));
	}

	return (
		<Inner>
			<Crumbs items={[{ text: collection.title, href: paths.phrase(collection.id) }]} />
			<Stack size={2} variant="section">
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					{collection.title}
				</Typography>
				<PhraseDetailToolbar
					allSelected={allSelected}
					onAllSelectedChange={setAllPhrasesSelected}
				/>
				{collection.phrases.length > 0 && (
					<Stack size={2} variant="ul">
						{collection.phrases.map((phrase, index) => (
							<Card
								key={`${phrase.fieldId}-${index}`}
								variant="li"
								borderColor="gray"
								hasBorderLeft
								hasRelative
							>
								<PhraseDetailCardSelect
									checked={isSelected(index)}
									onCheckedChange={() => togglePhrase(index)}
								>
									<PhraseCard phrase={phrase} hideThai={hideThai} speechLang={speechLang} />
								</PhraseDetailCardSelect>
							</Card>
						))}
					</Stack>
				)}
				<PhraseDetailStickyBar
					canStart={canStart}
					hideThai={hideThai}
					onStartRandomLesson={startRandomLesson}
					onStartAllLesson={startAllLesson}
					onToggleHideThai={toggleHideThai}
				/>
			</Stack>
		</Inner>
	);
}
