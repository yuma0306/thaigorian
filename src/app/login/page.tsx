import { AuthForm } from '@/components/AuthForm/AuthForm';
import { Inner } from '@/components/Inner/Inner';

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
				title="ログイン"
				description="Googleアカウントでログインしてください。"
				submitLabel="Googleでログイン"
				alternateHref="/signup"
				alternateLabel="アカウント登録はこちら"
				initialErrorMessage={error ? `ログインに失敗しました。${error}` : undefined}
			/>
		</Inner>
	);
}
