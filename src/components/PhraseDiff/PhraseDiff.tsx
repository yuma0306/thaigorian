import { Typography } from '@/components/Typography/Typography';
import { diffText } from '@/functions/diffText';
import styles from './PhraseDiff.module.css';

type Props = {
	input: string;
	expected: string;
	particle?: string;
};

export function PhraseDiff({ input, expected, particle }: Props) {
	const parts = diffText(input, expected);

	return (
		<div className={styles.root}>
			<Typography size={1} variant="p" color="dark" weight="bold" align="left">
				Comparison
			</Typography>
			<p className={styles.diff} lang="th">
				{parts.map((part, index) => (
					<span key={index} data-type={part.type}>
						{part.text}
					</span>
				))}
				{particle && <span>{particle}</span>}
			</p>
			<Typography size={1} variant="p" color="dark" weight="normal" align="left">
				<span className={styles.legendDelete}>Red</span> is extra,{' '}
				<span className={styles.legendInsert}>green</span> is missing
			</Typography>
		</div>
	);
}
