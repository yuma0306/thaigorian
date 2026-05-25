import type { ReactNode } from 'react';
import styles from './CardImageList.module.css';

type Props = {
	children: ReactNode;
};

export function CardImageList({ children }: Props) {
	return <div className={styles.list}>{children}</div>;
}
