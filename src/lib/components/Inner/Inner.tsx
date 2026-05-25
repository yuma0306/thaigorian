import type { ReactNode } from 'react';
import styles from './Inner.module.css';

type Props = {
	children: ReactNode;
};

export function Inner({ children }: Props) {
	return <div className={styles.inner}>{children}</div>;
}
