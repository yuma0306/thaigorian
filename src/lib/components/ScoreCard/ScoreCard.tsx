import { Card } from '@/lib/components/Card/Card';
import { FlexColumn } from '@/lib/components/FlexColumn/FlexColumn';
import { Typography } from '@/lib/components/Typography/Typography';

type Props = {
	score: number;
	total: number;
};

export function ScoreCard({ score, total }: Props) {
	return (
		<Card variant="div" borderColor="gray" hasBorderLeft={false}>
			<Typography size={2} variant="p" color="dark" weight="bold" align="center">
				スコア
			</Typography>
			<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="center">
				<Typography size={5} variant="p" color="secondary" weight="bold" align="center">
					{score}
				</Typography>
				<Typography size={5} variant="span" color="dark" weight="normal" align="center">
					/
				</Typography>
				<Typography size={5} variant="p" color="secondary" weight="bold" align="center">
					{total}
				</Typography>
			</FlexColumn>
		</Card>
	);
}
