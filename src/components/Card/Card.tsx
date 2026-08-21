import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

type Variant = 'li' | 'div';

type Props = HTMLAttributes<HTMLElement> & {
	borderColor: 'gray' | 'success' | 'warning';
	hasBorderLeft: boolean;
	variant: Variant;
	children: ReactNode;
} & Partial<{
		hasRelative: boolean;
	}>;

export function Card({
	borderColor,
	hasBorderLeft,
	variant,
	children,
	hasRelative,
	...rest
}: Props) {
	const Tag = variant;
	return (
		<Tag
			className={styles.card}
			data-has-border-left={hasBorderLeft}
			data-border-color={borderColor}
			data-has-relative={hasRelative}
			{...rest}
		>
			{children}
		</Tag>
	);
}
