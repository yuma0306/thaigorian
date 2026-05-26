import Link from 'next/link';
import { Inner } from '@/components/Inner/Inner';
import { siteData } from '@/constants/siteData';
import { paths } from '@/constants/paths';
import styles from './Footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<Inner>
				<Link className={styles.link} href={paths.signup}>
					会員登録
				</Link>
				<small className={styles.text}>
					&copy; {new Date().getFullYear()} {siteData.siteName}
				</small>
			</Inner>
		</footer>
	);
}
