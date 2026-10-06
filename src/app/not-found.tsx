import { Inner } from '@/components/Inner/Inner';
import { Typography } from '@/components/Typography/Typography';

export default function NotFound() {
	return (
		<Inner>
			<Typography size={4} variant="h1" color="secondary" weight="bold" align="center">
				Page not found
			</Typography>
		</Inner>
	);
}
