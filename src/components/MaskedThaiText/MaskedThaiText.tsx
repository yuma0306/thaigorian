import type { ReactNode } from 'react';
import styles from './MaskedThaiText.module.css';

type Props = {
	children: ReactNode;
	hidden: boolean;
};

export function MaskedThaiText({ children, hidden }: Props) {
	return (
		<span className={styles.wrapper} data-hidden={hidden}>
			{children}
			{hidden && <span className={styles.mask} aria-hidden="true" />}
		</span>
	);
}
