'use client';

import { Card } from '@/components/Card/Card';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import { ToggleDiffButton } from '@/components/ToggleDiffButton/ToggleDiffButton';
import { ToggleRevealButton } from '@/components/ToggleRevealButton/ToggleRevealButton';
import type { Phrase } from '@/types/database';

type Props = {
	meaning: Phrase['meaning'];
	phrase: Phrase['phrase'];
	showAnswer: boolean;
	showDiff: boolean;
	speechLang: string;
	onShowAnswerChange: (value: boolean) => void;
	onShowDiffChange: (value: boolean) => void;
};

export function QuestionCard({
	meaning,
	phrase,
	showAnswer,
	showDiff,
	speechLang,
	onShowAnswerChange,
	onShowDiffChange
}: Props) {
	return (
		<Card variant="div" borderColor="gray" hasBorderLeft={false}>
			<Stack size={2} variant="div">
				<Stack size={1} variant="div">
					<Typography size={2} variant="p" color="dark" weight="normal" align="center">
						{meaning}
					</Typography>
				</Stack>
				<FlexColumn gap={1} variant="div" alignItems="stretch" justifyContent="center">
					<VoiceButton text={phrase} lang={speechLang} />
					<ToggleRevealButton
						expanded={showAnswer}
						onClick={() => onShowAnswerChange(!showAnswer)}
					/>
					<ToggleDiffButton expanded={showDiff} onClick={() => onShowDiffChange(!showDiff)} />
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
