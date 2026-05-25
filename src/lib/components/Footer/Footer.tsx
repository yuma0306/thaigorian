import { Inner } from '@/lib/components/Inner/Inner';
import { siteData } from '@/lib/constants/siteData';
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
