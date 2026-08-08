import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './PairPageLink.module.css';

type Props = {
	href: string;
	children: ReactNode;
};

export function PairPageLink({ href, children }: Props) {
	return (
		<Link className={styles.link} href={href}>
			{children}
		</Link>
	);
}
