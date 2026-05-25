import type { HTMLAttributes, ReactNode } from 'react';
import styles from './FlexColumn.module.css';

type Variant = 'dt' | 'div' | 'span';

type Props = HTMLAttributes<HTMLElement> & {
	gap: 1 | 2 | 3 | 4 | 5;
	variant: Variant;
	alignItems?: 'start' | 'center' | 'end' | 'stretch';
	justifyContent?: 'start' | 'center' | 'end';
	isWrap?: boolean;
	children: ReactNode;
};

export function FlexColumn({
	children,
	gap,
	variant,
	alignItems = 'start',
	justifyContent = 'start',
	isWrap,
	...rest
}: Props) {
	const Tag = variant;
	return (
		<Tag
			className={styles.column}
			data-gap={gap}
			data-align-items={alignItems}
			data-justify-content={justifyContent}
			data-is-wrap={isWrap}
			{...rest}
		>
			{children}
		</Tag>
	);
}
