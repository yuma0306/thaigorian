import type { Phrase } from '@/types/database';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { ListItem } from '@/components/ListItem/ListItem';
import { MaskedThaiText } from '@/components/MaskedThaiText/MaskedThaiText';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { ActiveVoiceButton } from '@/components/VoiceButton/ActiveVoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';

type Word = NonNullable<Phrase['words']>[number];

type Props = {
	word: Word;
	hideThai: boolean;
	hideMeaning: boolean;
	voiceLang: string;
};

export function PhraseWordItem({ word, hideThai, hideMeaning, voiceLang }: Props) {
	return (
		<ListItem symbol="none">
			<Stack size={1} variant="div">
				{word.word && (
					<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start">
						<MaskedThaiText hidden={hideThai}>
							<Typography size={2} variant="span" color="primary" weight="bold" align="left">
								{word.word}
							</Typography>
						</MaskedThaiText>
						<ActiveVoiceButton text={word.word} lang={voiceLang} />
						<CopyButton text={word.word} />
					</FlexColumn>
				)}
				{word.meaning && (
					<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start">
						<MaskedThaiText hidden={hideMeaning}>
							<Typography size={2} variant="span" color="dark" weight="normal" align="left">
								{word.meaning}
							</Typography>
						</MaskedThaiText>
						<ActiveVoiceButton text={word.meaning} lang="en-US" />
						<CopyButton text={word.meaning} />
					</FlexColumn>
				)}
			</Stack>
		</ListItem>
	);
}
