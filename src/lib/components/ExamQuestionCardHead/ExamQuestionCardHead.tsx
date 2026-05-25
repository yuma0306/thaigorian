import type { ExamQuestion } from '@/lib/types';
import { Stack } from '@/lib/components/Stack/Stack';
import { Typography } from '@/lib/components/Typography/Typography';
import { FlexColumn } from '@/lib/components/FlexColumn/FlexColumn';
import { ListItem } from '@/lib/components/ListItem/ListItem';
import { VoiceButton } from '@/lib/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/lib/components/CopyButton/CopyButton';
import styles from './ExamQuestionCardHead.module.css';

type Props = {
	question: ExamQuestion;
};

export function ExamQuestionCardHead({ question }: Props) {
	const hasWords = Boolean(question.words && question.words.length > 0);

	return (
		<div className={styles.questionBlock} data-has-words={hasWords}>
			<Stack size={1} variant="div">
				<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start">
					<Typography size={4} variant="p" color="primary" weight="bold" align="left">
						{question.title}
					</Typography>
					{question.title && (
						<>
							<VoiceButton text={question.title} />
							<CopyButton text={question.title} />
						</>
					)}
				</FlexColumn>
				{question.ipa && (
					<Typography size={2} variant="p" color="dark" weight="normal" align="left">
						{question.ipa}
					</Typography>
				)}
				{question.meaning && (
					<Typography size={2} variant="p" color="dark" weight="normal" align="left">
						{question.meaning}
					</Typography>
				)}
			</Stack>
			{question.words && question.words.length > 0 && (
				<Stack size={1} variant="ul">
					{question.words.map((word) => (
						<ListItem key={word.fieldId} symbol="none">
							<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
								<Typography size={2} variant="span" color="primary" weight="bold" align="left">
									{word.word}
								</Typography>
								<Typography size={2} variant="span" color="dark" weight="normal" align="left">
									{word.meaning}
								</Typography>
								<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
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
			)}
		</div>
	);
}
