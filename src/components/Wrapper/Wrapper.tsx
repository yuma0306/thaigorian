import type { ReactNode } from 'react';
import styles from './Wrapper.module.css';

type Props = {
	children: ReactNode;
};

export function Wrapper({ children }: Props) {
	return <div className={styles.wrapper}>{children}</div>;
}
