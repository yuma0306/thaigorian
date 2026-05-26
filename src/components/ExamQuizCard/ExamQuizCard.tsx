'use client';

import { useState } from 'react';
import type { ExamQuestion } from '@/types';
import { Card } from '@/components/Card/Card';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import { ExamQuizCardHead } from '@/components/ExamQuizCardHead/ExamQuizCardHead';
import { ExamQuizOptionButton } from '@/components/ExamQuizOptionButton/ExamQuizOptionButton';

type Props = {
	question: ExamQuestion;
	onSelect: (optionIndex: number) => void;
	selectedIndex?: number;
};

export function ExamQuizCard({ question, onSelect, selectedIndex }: Props) {
	const showResult = selectedIndex !== undefined;
	const [showOptionMeaning, setShowOptionMeaning] = useState<Record<number, boolean>>({});

	function toggleOptionMeaning(i: number) {
		setShowOptionMeaning((prev) => ({ ...prev, [i]: !prev[i] }));
	}

	return (
		<Card variant="div" borderColor="gray" hasBorderLeft={false}>
			<Stack size={2} variant="div">
				<ExamQuizCardHead question={question} />
				<Stack size={2} variant="ul">
					{question.options?.map((option, i) => (
						<Stack key={option.fieldId ?? i} size={1} variant="li">
							<ExamQuizOptionButton
								optionNumber={i + 1}
								optionText={option.option ?? ''}
								correct={showResult && !!option.isCorrect}
								incorrect={showResult && selectedIndex === i && !option.isCorrect}
								disabled={showResult}
								onClick={() => onSelect(i)}
							/>
							<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
								{option.option && (
									<>
										<VoiceButton text={option.option} />
										<CopyButton text={option.option} />
									</>
								)}
								<ToggleRevealButton
									expanded={showOptionMeaning[i]}
									showLabel="👀 訳を見る"
									hideLabel="🙈 訳を隠す"
									ariaLabel="訳を見る"
									onClick={(e) => {
										e.stopPropagation();
										toggleOptionMeaning(i);
									}}
								/>
							</FlexColumn>
							{showOptionMeaning[i] && (
								<Typography size={2} variant="p" color="dark" weight="normal" align="left">
									{option.meaning}
								</Typography>
							)}
						</Stack>
					))}
				</Stack>
			</Stack>
		</Card>
	);
}
