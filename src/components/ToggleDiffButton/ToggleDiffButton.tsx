import type { MouseEvent } from 'react';
import { CompareIcon } from '@/components/Icon/CompareIcon';
import styles from './ToggleDiffButton.module.css';

type Props = {
	expanded?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToggleDiffButton({ expanded = false, onClick }: Props) {
	const label = expanded ? '比較を隠す' : '入力と正解を比較';
	return (
		<button
			type="button"
			className={styles.toggleDiff}
			data-expanded={expanded}
			onClick={onClick}
			aria-label={label}
			title={label}
			aria-pressed={expanded}
		>
			<CompareIcon />
		</button>
	);
}
