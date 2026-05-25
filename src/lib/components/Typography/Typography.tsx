import type { ReactNode } from 'react';
import styles from './Typography.module.css';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'dt' | 'dd';

type Props = {
	children: ReactNode;
	size: 1 | 2 | 3 | 4 | 5;
	variant: Variant;
	color: 'primary' | 'secondary' | 'dark' | 'white' | 'gray';
	weight: 'normal' | 'bold';
	align: 'left' | 'center' | 'right';
};

export function Typography({ children, size, variant, color, weight, align }: Props) {
	const Tag = variant;
	return (
		<Tag
			className={styles.typography}
			data-size={size}
			data-color={color}
			data-weight={weight}
			data-align={align}
		>
			{children}
		</Tag>
	);
}
