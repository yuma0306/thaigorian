import type { Phrase } from '@/types/database';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { ListItem } from '@/components/ListItem/ListItem';
import { MaskedThaiText } from '@/components/MaskedThaiText/MaskedThaiText';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import styles from './PhraseCard.module.css';

type Props = {
	phrase: Phrase;
	hideThai?: boolean;
};

export function PhraseCard({ phrase, hideThai = false }: Props) {
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
					<VoiceButton text={phrase.phrase} />
					<CopyButton text={phrase.phrase} />
				</FlexColumn>
				{phrase.meaning && (
					<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
						{phrase.meaning}
					</Typography>
				)}
			</Stack>
			{hasWords && (
				<div className={styles.footer}>
					<Stack size={2} variant="ul">
						{phrase.words!.map((word, index) => (
							<ListItem key={index} symbol="none">
								<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
									<MaskedThaiText hidden={hideThai}>
										<Typography size={2} variant="span" color="primary" weight="bold" align="left">
											{word.word}
										</Typography>
									</MaskedThaiText>
									<Typography size={2} variant="span" color="dark" weight="normal" align="left">
										{word.meaning}
									</Typography>
									<FlexColumn
										gap={1}
										variant="div"
										alignItems="center"
										justifyContent="start"
										isWrap
									>
										{word.word && (
											<>
												<VoiceButton text={word.word} />
												<CopyButton text={word.word} />
											</>
										)}
									</FlexColumn>
								</FlexColumn>
							</ListItem>
						))}
					</Stack>
				</div>
			)}
		</div>
	);
}
