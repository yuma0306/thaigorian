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
				title="ログイン"
				description="Googleアカウントでログインしてください。"
				googleButtonMode="signin"
				alternateHref={paths.signup}
				alternateLabel="アカウント登録はこちら"
				initialErrorMessage={error ? `ログインに失敗しました。${error}` : ''}
			/>
		</Inner>
	);
}
