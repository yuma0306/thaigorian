import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';
import { paths } from '@/constants/paths';

export default function SignupPage() {
	return (
		<Inner>
			<AuthForm
				title="Sign up"
				description="Sign up with your Google account."
				googleButtonMode="signup"
				alternateHref={paths.login}
				alternateLabel="Log in"
			/>
		</Inner>
	);
}
