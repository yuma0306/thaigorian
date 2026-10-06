import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';
import { paths } from '@/constants/paths';

type Props = {
	searchParams: Promise<{
		error?: string;
	}>;
};

export default async function LoginPage({ searchParams }: Props) {
	const { error } = await searchParams;
	return (
		<Inner>
			<AuthForm
				title="Log in"
				description="Log in with your Google account."
				googleButtonMode="signin"
				alternateHref={paths.signup}
				alternateLabel="Create an account"
				initialErrorMessage={error ? `Could not log in. ${error}` : ''}
			/>
		</Inner>
	);
}
