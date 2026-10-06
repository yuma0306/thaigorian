import styles from './PhraseAddButton.module.css';

export function PhraseAddButton({
	onClick,
	layer,
	position,
	isAbsolute
}: {
	onClick: () => void;
	layer: 'first' | 'secound';
	position: 'center' | 'left';
	isAbsolute: boolean;
}) {
	return (
		<button
			className={styles.button}
			data-position={position}
			data-is-absolute={isAbsolute}
			data-layer={layer}
			type="button"
			onClick={onClick}
			aria-label="Add field"
		>
			<span className={styles.icon} data-layer={layer} aria-hidden="true">
				＋
			</span>
		</button>
	);
}
