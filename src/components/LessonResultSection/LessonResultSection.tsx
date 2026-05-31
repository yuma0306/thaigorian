import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { PhraseCard } from '@/components/PhraseCard/PhraseCard';
import { ScoreCard } from '@/components/ScoreCard/ScoreCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import type { LessonResult } from '@/types/database';

type Props = {
	correctCount: number;
	total: number;
	results: LessonResult[];
	backHref: string;
};

export function LessonResultSection({ correctCount, total, results, backHref }: Props) {
	return (
		<Stack size={3} variant="section">
			<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
				結果
			</Typography>
			<ScoreCard score={correctCount} total={total} />
			<Stack size={2} variant="ul">
				{results.map((result, index) => (
					<Card
						key={`${result.phrase.fieldId}-${index}`}
						variant="li"
						borderColor={result.correct ? 'success' : 'warning'}
						hasBorderLeft
					>
						<PhraseCard phrase={result.phrase} />
					</Card>
				))}
			</Stack>
			<Button variant="a" color="secondary" href={backHref}>
				戻る
			</Button>
		</Stack>
	);
}
