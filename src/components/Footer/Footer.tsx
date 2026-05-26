import { Inner } from '@/components/Inner/Inner';
import { siteData } from '@/constants/siteData';
import styles from './Footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<Inner>
				<small className={styles.text}>
					&copy; {new Date().getFullYear()} 🍍{siteData.siteName}
				</small>
			</Inner>
		</footer>
	);
}
