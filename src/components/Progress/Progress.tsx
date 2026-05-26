import styles from './Progress.module.css';

type Props = {
	value: number;
	max: number;
};

export function Progress({ value, max }: Props) {
	return <progress className={styles.progress} value={value} max={max} />;
}
