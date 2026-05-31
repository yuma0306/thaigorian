import { Card } from '@/components/Card/Card';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';

type Props = {
	displayName: string;
	email: string;
	errorMessage: string;
};

export function MemberProfileCard({ displayName, email, errorMessage }: Props) {
	return (
		<Card borderColor="gray" hasBorderLeft={false} variant="div">
			<Stack size={2} variant="div">
				<Stack size={1} variant="dl">
					<Typography size={2} variant="dt" color="primary" weight="bold" align="left">
						名前
					</Typography>
					<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
						{displayName}
					</Typography>
					<Typography size={2} variant="dt" color="primary" weight="bold" align="left">
						メールアドレス
					</Typography>
					<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
						{email}
					</Typography>
				</Stack>
				{errorMessage && (
					<Typography size={2} variant="p" color="secondary" weight="bold" align="center">
						{errorMessage}
					</Typography>
				)}
			</Stack>
		</Card>
	);
}
