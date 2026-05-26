import Link from 'next/link';
import { siteData } from '@/constants/siteData';
import styles from './Logo.module.css';

export function Logo() {
	return (
		<Link className={styles.logo} href="/">
			{siteData.siteName}
		</Link>
	);
}
