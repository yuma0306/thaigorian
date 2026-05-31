import styles from './SkipButton.module.css';

type Props = {
	onClick: () => void;
};

export function SkipButton({ onClick }: Props) {
	return (
		<button type="button" className={styles.skip} onClick={onClick}>
			スキップ
		</button>
	);
}
