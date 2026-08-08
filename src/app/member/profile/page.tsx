import { Crumbs } from '@/components/Crumbs/Crumbs';
import { Inner } from '@/components/Inner/Inner';
import { MemberProfileCard } from '@/components/MemberProfileCard/MemberProfileCard';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { paths } from '@/constants/paths';
import { getMemberDisplayName, getMemberEmail } from '@/functions/memberDisplayName';
import { getMemberSession } from '@/functions/memberSession';

export default async function MemberProfilePage() {
	const { user, profile, profileError } = await getMemberSession();

	return (
		<Inner>
			<Stack size={2} variant="section">
				<Crumbs
					items={[
						{ text: 'マイページ', href: paths.member },
						{ text: '会員情報', href: paths.memberProfile }
					]}
				/>
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					会員情報
				</Typography>
				<MemberProfileCard
					displayName={getMemberDisplayName(profile, user)}
					email={getMemberEmail(profile, user)}
					errorMessage={profileError ? '会員情報を取得できませんでした。' : ''}
				/>
			</Stack>
		</Inner>
	);
}
