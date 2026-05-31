import type { MouseEvent } from 'react';
import styles from './ToggleRevealButton.module.css';

type Props = {
	expanded?: boolean;
	showLabel: string;
	hideLabel: string;
	ariaLabel: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleRevealButton({
	expanded = false,
	showLabel,
	hideLabel,
	ariaLabel,
	onClick
}: Props) {
	return (
		<button type="button" className={styles.toggleReveal} onClick={onClick} aria-label={ariaLabel}>
			{expanded ? hideLabel : showLabel}
		</button>
	);
}
