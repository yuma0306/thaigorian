import styles from './CompareIcon.module.css';

export function CompareIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.icon}>
			<path d="M96,64c-17.673,0-32,14.327-32,32v320c0,17.673,14.327,32,32,32h128c17.673,0,32-14.327,32-32V96c0-17.673-14.327-32-32-32H96z M128,384V128h64v256H128z" />
			<path d="M288,64c-17.673,0-32,14.327-32,32v320c0,17.673,14.327,32,32,32h128c17.673,0,32-14.327,32-32V96c0-17.673-14.327-32-32-32H288z M320,384V128h64v256H320z" />
		</svg>
	);
}
