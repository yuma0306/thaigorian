'use client';

import { useState } from 'react';
import type { ExamQuestion } from '@/types';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';

type Props = {
	question: ExamQuestion;
};

export function ExamQuizCardHead({ question }: Props) {
	const [showQuestionMeaning, setShowQuestionMeaning] = useState(false);

	return (
		<Stack size={1} variant="div">
			<Typography size={4} variant="p" color="primary" weight="bold" align="center">
				{question.title}
			</Typography>
			<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="center">
				{question.title && (
					<>
						<VoiceButton text={question.title} />
						<CopyButton text={question.title} />
					</>
				)}
				<ToggleRevealButton
					expanded={showQuestionMeaning}
					showLabel="👀 訳を見る"
					hideLabel="🙈 訳を隠す"
					ariaLabel="訳を見る"
					onClick={() => setShowQuestionMeaning((v) => !v)}
				/>
			</FlexColumn>
			{showQuestionMeaning && (
				<Typography size={2} variant="p" color="dark" weight="normal" align="center">
					{question.meaning}
				</Typography>
			)}
		</Stack>
	);
}
