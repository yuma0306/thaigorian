'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card/Card';
import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { PairPageLink } from '@/components/PairPageLink/PairPageLink';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { PhraseDetailCardSelect } from '@/components/PhraseDetailCardSelect/PhraseDetailCardSelect';
import { PhraseDetailToolbar } from '@/components/PhraseDetailToolbar/PhraseDetailToolbar';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import type { MyPhraseCategoryView } from '@/types/myPhrases';
import { allLessonIndices, pickRandomIndices } from '@/functions/lesson';
import { saveLessonIndices } from '@/functions/lessonSession';
import { usePhraseSelection } from '@/hooks/usePhraseSelection';
import { useThaiVisibility } from '@/hooks/useThaiVisibility';

type Props = {
	category: MyPhraseCategoryView;
};

export function MyPhraseDetail({ category }: Props) {
	const router = useRouter();
	const { hideThai, toggleHideThai } = useThaiVisibility();
	const { selectedIndices, allSelected, isSelected, togglePhrase, setAllPhrasesSelected } =
		usePhraseSelection(category.phrases.length);
	const canStart = selectedIndices.length > 0;

	function startRandomLesson() {
		if (selectedIndices.length === 0) return;
		saveLessonIndices('my-phrase', category.id, pickRandomIndices(selectedIndices));
		router.push(paths.myPhraseLesson(category.id));
	}

	function startAllLesson() {
		if (selectedIndices.length === 0) return;
		saveLessonIndices('my-phrase', category.id, allLessonIndices(selectedIndices));
		router.push(paths.myPhraseLesson(category.id));
	}

	return (
		<Stack size={2} variant="div">
			<Crumbs items={[{ text: category.title, href: paths.myPhrase(category.id) }]} />
			<Inner>
				<Stack size={2} variant="section">
					<PairPageLink href={paths.memberPhrasesDetail(category.id)}>編集する</PairPageLink>
					<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
						{category.title}
					</Typography>
					<PhraseDetailToolbar
						allSelected={allSelected}
						canStart={canStart}
						hideThai={hideThai}
						onAllSelectedChange={setAllPhrasesSelected}
						onStartRandomLesson={startRandomLesson}
						onStartAllLesson={startAllLesson}
						onToggleHideThai={toggleHideThai}
					/>
					{category.phrases.length > 0 && (
						<Stack size={2} variant="ul">
							{category.phrases.map((phrase, index) => (
								<Card
									key={`${phrase.fieldId}-${index}`}
									variant="li"
									borderColor="gray"
									hasBorderLeft={false}
									hasRelative
								>
									<PhraseDetailCardSelect
										checked={isSelected(index)}
										onCheckedChange={() => togglePhrase(index)}
									>
										<PhraseCard
											phrase={phrase}
											hideThai={hideThai}
											speechLang={category.speechLang}
										/>
									</PhraseDetailCardSelect>
								</Card>
							))}
						</Stack>
					)}
				</Stack>
			</Inner>
		</Stack>
	);
}
