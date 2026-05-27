import { Inner } from '@/components/Inner/Inner';
import { Logo } from '@/components/Logo/Logo';
import { paths } from '@/constants/paths';
import styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<Inner>
				<div className={styles.inner}>
					<Logo />
					<a className={styles.signupLink} href={paths.login}>
						ログイン
					</a>
				</div>
			</Inner>
		</header>
	);
}
