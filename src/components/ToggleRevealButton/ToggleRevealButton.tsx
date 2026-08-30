import type { MouseEvent } from 'react';
import { ClosedEyeIcon } from '@/components/Icon/ClosedEyeIcon';
import { OpenEyeIcon } from '@/components/Icon/OpenEyeIcon';
import styles from './ToggleRevealButton.module.css';

type Props = {
	expanded?: boolean;
	isFixed?: boolean;
	hideLabel?: string;
	showLabel?: string;
	caption?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleRevealButton({
	expanded = false,
	isFixed = false,
	hideLabel = 'フレーズを隠す',
	showLabel = 'フレーズを表示',
	caption,
	onClick
}: Props) {
	const label = expanded ? hideLabel : showLabel;
	return (
		<button
			type="button"
			className={styles.toggleReveal}
			data-is-fixed={isFixed}
			onClick={onClick}
			aria-label={label}
			title={label}
		>
			{caption && <span className={styles.caption}>{caption}</span>}
			{expanded ? <ClosedEyeIcon /> : <OpenEyeIcon />}
		</button>
	);
}
