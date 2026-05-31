import { MemberHome } from '@/components/MemberHome/MemberHome';
import { getMemberDisplayName, getMemberEmail } from '@/functions/memberDisplayName';
import { getMemberSession } from '@/functions/memberSession';

export default async function MemberPage() {
	const { user, profile, profileError } = await getMemberSession();

	return (
		<MemberHome
			displayName={getMemberDisplayName(profile, user)}
			email={getMemberEmail(profile, user)}
			errorMessage={profileError ? '会員情報を取得できませんでした。' : ''}
		/>
	);
}
