import styles from './PhraseAddButtonWrapper.module.css';

export function PhraseAddButtonWrapper({
	children,
	layer
}: {
	children: React.ReactNode;
	layer: 'first' | 'secound';
}) {
	return (
		<div className={styles.wrapper} data-layer={layer}>
			{children}
		</div>
	);
}
