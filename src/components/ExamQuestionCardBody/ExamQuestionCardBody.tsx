import type { ExamQuestion } from '@/types';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { ListItem } from '@/components/ListItem/ListItem';
import { VoiceButton } from '@/components/VoiceButton/VoiceButton';
import { CopyButton } from '@/components/CopyButton/CopyButton';
import styles from './ExamQuestionCardBody.module.css';

type Props = {
	question: ExamQuestion;
};

export function ExamQuestionCardBody({ question }: Props) {
	if (!question.options || question.options.length === 0) return null;

	return (
		<ul>
			{question.options.map((option, i) => (
				<li
					key={option.fieldId ?? i}
					className={styles.option}
					data-is-correct={option.isCorrect}
					data-has-words={Boolean(option.words && option.words.length > 0)}
				>
					<div className={styles.optionInner}>
						<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
							<Typography size={2} variant="span" color="primary" weight="normal" align="left">
								{i + 1}.
							</Typography>
							<Typography size={2} variant="span" color="primary" weight="bold" align="left">
								{option.option}
							</Typography>
							<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap>
								{option.option && (
									<>
										<VoiceButton text={option.option} />
										<CopyButton text={option.option} />
									</>
								)}
							</FlexColumn>
						</FlexColumn>
						{option.ipa && (
							<Typography size={2} variant="span" color="dark" weight="normal" align="left">
								{option.ipa}
							</Typography>
						)}
						{option.meaning && (
							<Typography size={2} variant="span" color="dark" weight="normal" align="left">
								{option.meaning}
							</Typography>
						)}
					</div>
					{option.words && option.words.length > 0 && (
						<Stack size={1} variant="ul">
							{option.words.map((word) => (
								<ListItem key={word.fieldId} symbol="none">
									<FlexColumn
										gap={1}
										variant="div"
										alignItems="center"
										justifyContent="start"
										isWrap
									>
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
					)}
				</li>
			))}
		</ul>
	);
}
