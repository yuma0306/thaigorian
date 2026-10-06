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
						{ text: 'My Page', href: paths.member },
						{ text: 'Profile', href: paths.memberProfile }
					]}
				/>
				<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
					Profile
				</Typography>
				<MemberProfileCard
					displayName={getMemberDisplayName(profile, user)}
					email={getMemberEmail(profile, user)}
					errorMessage={profileError ? 'Could not load profile.' : ''}
				/>
			</Stack>
		</Inner>
	);
}
