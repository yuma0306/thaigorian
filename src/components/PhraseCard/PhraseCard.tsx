import type { Phrase } from '@/types';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { ListItem } from '@/components/ListItem/ListItem';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import styles from './PhraseCard.module.css';

type Props = {
	phrase: Phrase;
};

export function PhraseCard({ phrase }: Props) {
	const hasWords = Boolean(phrase.words && phrase.words.length > 0);

	return (
		<div className={styles.card} data-has-words={hasWords}>
			<Stack size={1} variant="dl">
				<FlexColumn gap={1} variant="dt" alignItems="center" justifyContent="start">
					<Typography size={4} variant="p" color="primary" weight="bold" align="left">
						{phrase.phrase}
					</Typography>
					<VoiceButton text={phrase.phrase} />
					<CopyButton text={phrase.phrase} />
				</FlexColumn>
				{phrase.ipa && (
					<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
						{phrase.ipa}
					</Typography>
				)}
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
									<Typography size={2} variant="span" color="primary" weight="bold" align="left">
										{word.word}
									</Typography>
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
