import type { ReactNode } from 'react';
import styles from './ListItem.module.css';

type Props = {
	children: ReactNode;
	symbol: 'dot' | 'asterisk' | 'number' | 'none';
};

export function ListItem({ children, symbol }: Props) {
	return (
		<li className={styles.item} data-symbol={symbol}>
			<div>{children}</div>
		</li>
	);
}
