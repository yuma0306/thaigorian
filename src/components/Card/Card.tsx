import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

type Variant = 'li' | 'div';

type Props = HTMLAttributes<HTMLElement> & {
	borderColor: 'gray' | 'success' | 'warning';
	hasBorderLeft: boolean;
	variant: Variant;
	children: ReactNode;
};

export function Card({ borderColor, hasBorderLeft, variant, children, ...rest }: Props) {
	const Tag = variant;
	return (
		<Tag
			className={styles.card}
			data-has-border-left={hasBorderLeft}
			data-border-color={borderColor}
			{...rest}
		>
			{children}
		</Tag>
	);
}
