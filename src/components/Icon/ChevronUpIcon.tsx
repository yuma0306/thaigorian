import styles from './ChevronUpIcon.module.css';

export function ChevronUpIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.icon}>
			<path d="M256 128 64 320l64 64 128-128 128 128 64-64z" />
		</svg>
	);
}
