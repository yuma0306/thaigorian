'use client';

import { Card } from '@/lib/components/Card/Card';
import { FlexColumn } from '@/lib/components/FlexColumn/FlexColumn';
import { Stack } from '@/lib/components/Stack/Stack';
import { Typography } from '@/lib/components/Typography/Typography';
import { VoiceButton } from '@/lib/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/lib/components/CopyButton/CopyButton';
import { ToggleRevealButton } from '@/lib/components/ToggleRevealButton/ToggleRevealButton';
import type { Phrase } from '@/lib/types';

type Props = {
	meaning: Phrase['meaning'];
	phrase: Phrase['phrase'];
	showAnswer: boolean;
	onShowAnswerChange: (value: boolean) => void;
};

export function QuestionCard({ meaning, phrase, showAnswer, onShowAnswerChange }: Props) {
	return (
		<Card variant="div" borderColor="gray" hasBorderLeft={false}>
			<Stack size={2} variant="div">
				<Stack size={1} variant="div">
					<Typography size={2} variant="p" color="dark" weight="normal" align="center">
						{meaning}
					</Typography>
				</Stack>
				<FlexColumn gap={1} variant="div" alignItems="stretch" justifyContent="center">
					<VoiceButton text={phrase} />
					<ToggleRevealButton
						expanded={showAnswer}
						showLabel="👀 回答を見る"
						hideLabel="🙈 回答を隠す"
						ariaLabel="回答を見る"
						onClick={() => onShowAnswerChange(!showAnswer)}
					/>
				</FlexColumn>
				{showAnswer && (
					<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="center">
						<Typography size={3} variant="p" color="primary" weight="bold" align="left">
							{phrase}
						</Typography>
						<CopyButton text={phrase} />
					</FlexColumn>
				)}
			</Stack>
		</Card>
	);
}
