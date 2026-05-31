import styles from './Spinner.module.css';

export function Spinner() {
	return (
		<div aria-label="読み込み中" className={styles.wrapper} role="status">
			<div className={styles.spinner} />
		</div>
	);
}
