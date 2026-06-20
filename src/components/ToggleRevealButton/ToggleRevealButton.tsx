import type { MouseEvent } from 'react';
import styles from './ToggleRevealButton.module.css';

type Props = {
	expanded?: boolean;
	showLabel: string;
	hideLabel: string;
	ariaLabel: string;
	isFixed?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleRevealButton({
	expanded = false,
	showLabel,
	hideLabel,
	ariaLabel,
	isFixed = false,
	onClick
}: Props) {
	return (
		<button
			type="button"
			className={styles.toggleReveal}
			data-is-fixed={isFixed}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			{expanded ? hideLabel : showLabel}
		</button>
	);
}
