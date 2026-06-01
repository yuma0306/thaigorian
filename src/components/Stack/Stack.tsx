import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Stack.module.css';

type Variant = 'div' | 'ul' | 'section' | 'dl' | 'li';

type Props = HTMLAttributes<HTMLElement> & {
	size: 1 | 2 | 3 | 4 | 5;
	variant: Variant;
	children: ReactNode;
	justifyItems?: 'start';
};

export function Stack({ size, variant, children, justifyItems, ...rest }: Props) {
	const Tag = variant;
	return (
		<Tag className={styles.stack} data-size={size} data-justify-items={justifyItems} {...rest}>
			{children}
		</Tag>
	);
}
