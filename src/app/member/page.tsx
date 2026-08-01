import { MemberHome } from '@/components/MemberHome/MemberHome';
import { getMemberSession } from '@/functions/memberSession';

export default async function MemberPage() {
	await getMemberSession();

	return <MemberHome />;
}
