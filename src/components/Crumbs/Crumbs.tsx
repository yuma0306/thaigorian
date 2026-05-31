import Link from 'next/link';
import { paths } from '@/constants/paths';
import styles from './Crumbs.module.css';

type CrumbItem = {
	text: string;
	href: string;
};

type Props = {
	items: CrumbItem[];
};

const homeCrumb: CrumbItem = { text: 'ホーム', href: paths.home };

export function Crumbs({ items }: Props) {
	const allItems = [homeCrumb, ...items];
	if (allItems.length === 1) return;
	return (
		<ul className={styles.crumbs}>
			{allItems.map((item, index) => (
				<li key={`${item.href}-${index}`} className={styles.item}>
					{index === allItems.length - 1 ? (
						<span className={styles.textCurrent}>{item.text}</span>
					) : (
						<Link className={styles.link} href={item.href}>
							{item.text}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
}
