import { Inner } from '@/components/Inner/Inner';
import { Typography } from '@/components/Typography/Typography';

export default function Loading() {
	return (
		<Inner>
			<Typography size={3} variant="p" color="dark" weight="bold" align="center">
				会員情報を読み込み中です。
			</Typography>
		</Inner>
	);
}
