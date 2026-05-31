import type { ReactNode } from 'react';
import styles from './Main.module.css';

type Props = {
	children: ReactNode;
};

export function Main({ children }: Props) {
	return <main className={styles.main}>{children}</main>;
}
