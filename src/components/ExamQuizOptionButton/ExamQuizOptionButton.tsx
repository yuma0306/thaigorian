import { FlexColumn } from '@/components/FlexColumn/FlexColumn';
import { Typography } from '@/components/Typography/Typography';
import styles from './ExamQuizOptionButton.module.css';

type Props = {
	optionNumber: number;
	optionText: string;
	correct: boolean;
	incorrect: boolean;
	disabled: boolean;
	onClick?: () => void;
};

export function ExamQuizOptionButton({
	optionNumber,
	optionText,
	correct,
	incorrect,
	disabled,
	onClick
}: Props) {
	return (
		<button
			type="button"
			className={styles.button}
			data-correct={correct}
			data-incorrect={incorrect}
			disabled={disabled}
			onClick={onClick}
		>
			<FlexColumn gap={1} variant="span" alignItems="center" justifyContent="start" isWrap>
				<Typography size={2} variant="span" color="primary" weight="normal" align="left">
					{optionNumber}.
				</Typography>
				<Typography size={2} variant="span" color="primary" weight="bold" align="left">
					{optionText}
				</Typography>
			</FlexColumn>
		</button>
	);
}
