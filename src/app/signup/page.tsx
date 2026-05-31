import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';
import { paths } from '@/constants/paths';

export default function SignupPage() {
	return (
		<Inner>
			<AuthForm
				title="サインアップ"
				description="Googleアカウントで会員登録してください。"
				googleButtonMode="signup"
				alternateHref={paths.login}
				alternateLabel="ログインはこちら"
			/>
		</Inner>
	);
}
