import type { MouseEvent } from 'react';
import { ClosedEyeIcon } from '@/components/Icon/ClosedEyeIcon';
import { OpenEyeIcon } from '@/components/Icon/OpenEyeIcon';
import styles from './ToggleRevealButton.module.css';

type Props = {
	label: string;
	expanded: boolean;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleRevealButton({ label, expanded, onClick }: Props) {
	return (
		<button
			type="button"
			className={styles.toggleReveal}
			onClick={onClick}
			aria-label={label}
			title={label}
		>
			<span className={styles.label}>{label}</span>
			{expanded ? <ClosedEyeIcon /> : <OpenEyeIcon />}
		</button>
	);
}
