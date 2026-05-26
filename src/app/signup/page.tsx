import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';

export default function SignupPage() {
	return (
		<Inner>
			<AuthForm
				title="サインアップ"
				description="Googleアカウントで会員登録してください。"
				submitLabel="Googleで会員登録"
				alternateHref="/login"
				alternateLabel="ログインはこちら"
			/>
		</Inner>
	);
}
