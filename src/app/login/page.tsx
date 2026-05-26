import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';

export default function LoginPage() {
	return (
		<Inner>
			<AuthForm
				title="ログイン"
				description="Googleアカウントでログインしてください。"
				submitLabel="Googleでログイン"
				alternateHref="/signup"
				alternateLabel="アカウント登録はこちら"
			/>
		</Inner>
	);
}
