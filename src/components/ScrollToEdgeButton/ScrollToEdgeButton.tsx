'use client';

import { ChevronDownIcon } from '@/components/Icon/ChevronDownIcon';
import { ChevronUpIcon } from '@/components/Icon/ChevronUpIcon';
import styles from './ScrollToEdgeButton.module.css';

type Props = {
	direction: 'top' | 'bottom';
};

export function ScrollToEdgeButton({ direction }: Props) {
	const isTop = direction === 'top';
	const label = isTop ? 'Top' : 'Bottom';

	function handleClick() {
		const top = isTop ? 0 : document.documentElement.scrollHeight;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	return (
		<button
			type="button"
			className={styles.scrollToEdge}
			onClick={handleClick}
			aria-label={label}
			title={label}
		>
			<span className={styles.caption}>{label}</span>
			{isTop ? <ChevronUpIcon /> : <ChevronDownIcon />}
		</button>
	);
}
