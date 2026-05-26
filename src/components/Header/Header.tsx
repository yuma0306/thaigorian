import { Inner } from '@/components/Inner/Inner';
import { Logo } from '@/components/Logo/Logo';
import styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<Inner>
				<Logo />
			</Inner>
		</header>
	);
}
