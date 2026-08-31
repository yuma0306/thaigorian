import type { Phrase } from '@/types/database';
import type { SpeechLang } from '@/constants/speechLangs';
import { resolveSpeechLang } from '@/constants/speechLangs';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { MaskedThaiText } from '@/components/MaskedThaiText/MaskedThaiText';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { ActiveVoiceButton } from '@/components/VoiceButton/ActiveVoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import { PhraseWordItem } from './PhraseWordItem';
import styles from './PhraseCard.module.css';

type Props = {
	phrase: Phrase;
	hideThai?: boolean;
	hideMeaning?: boolean;
	speechLang?: SpeechLang | string;
};

export function PhraseCard({ phrase, hideThai = false, hideMeaning = false, speechLang }: Props) {
	const voiceLang = resolveSpeechLang(speechLang);
	const hasWords = Boolean(phrase.words && phrase.words.length > 0);

	return (
		<div className={styles.card} data-has-words={hasWords}>
			<Stack size={1} variant="dl">
				<FlexColumn gap={1} variant="dt" alignItems="center" justifyContent="start">
					<MaskedThaiText hidden={hideThai}>
						<Typography size={4} variant="p" color="primary" weight="bold" align="left">
							{phrase.phrase}
						</Typography>
					</MaskedThaiText>
					<ActiveVoiceButton text={phrase.phrase} lang={voiceLang} />
					<CopyButton text={phrase.phrase} />
				</FlexColumn>
				{phrase.meaning && (
					<FlexColumn gap={1} variant="dd" alignItems="center" justifyContent="start">
						<MaskedThaiText hidden={hideMeaning}>
							<Typography size={2} variant="span" color="dark" weight="normal" align="left">
								{phrase.meaning}
							</Typography>
						</MaskedThaiText>
						<ActiveVoiceButton text={phrase.meaning} lang="en-US" />
						<CopyButton text={phrase.meaning} />
					</FlexColumn>
				)}
			</Stack>
			{hasWords && (
				<div className={styles.footer}>
					<ul className={styles.wordList}>
						{phrase.words!.map((word, index) => (
							<PhraseWordItem
								key={index}
								word={word}
								hideThai={hideThai}
								hideMeaning={hideMeaning}
								voiceLang={voiceLang}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
