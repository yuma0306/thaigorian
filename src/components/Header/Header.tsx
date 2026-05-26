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
					<a className={styles.signupLink} href={paths.signup}>
						会員登録
					</a>
				</div>
			</Inner>
		</header>
	);
}
