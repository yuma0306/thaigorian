import type { MouseEvent } from 'react';
import { ClosedEyeIcon } from '@/components/Icon/ClosedEyeIcon';
import { OpenEyeIcon } from '@/components/Icon/OpenEyeIcon';
import styles from './ToggleRevealButton.module.css';

type Props = {
	expanded?: boolean;
	isFixed?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleRevealButton({ expanded = false, isFixed = false, onClick }: Props) {
	const label = expanded ? 'フレーズを隠す' : 'フレーズを表示';
	return (
		<button
			type="button"
			className={styles.toggleReveal}
			data-is-fixed={isFixed}
			onClick={onClick}
			aria-label={label}
			title={label}
		>
			{expanded ? <ClosedEyeIcon /> : <OpenEyeIcon />}
		</button>
	);
}
