import styles from './Spinner.module.css';

export function Spinner() {
	return (
		<div aria-label="Loading" className={styles.wrapper} role="status">
			<div className={styles.spinner} />
		</div>
	);
}
