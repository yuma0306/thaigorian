import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type CommonProps = {
	color: 'secondary' | 'success';
	children: ReactNode;
};

type ButtonProps = CommonProps & { variant: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & { variant: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
	const { children, variant, color, ...rest } = props;

	if (variant === 'a') {
		const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
		return (
			<Link
				className={styles.button}
				data-color={color}
				href={href ?? '#'}
				{...anchorRest}
			>
				{children}
			</Link>
		);
	}

	const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button className={styles.button} data-color={color} type={type} {...buttonRest}>
			{children}
		</button>
	);
}
