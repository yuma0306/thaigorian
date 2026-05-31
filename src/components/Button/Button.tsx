import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type CommonProps = {
	color: 'secondary' | 'success';
	children: ReactNode;
};

type ButtonProps = CommonProps & { variant: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & { variant: 'a' } & Omit<
		ComponentProps<typeof Link>,
		'children' | 'className'
	>;

type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
	const { children, variant, color, ...rest } = props;

	if (variant === 'a') {
		return (
			<Link
				className={styles.button}
				data-color={color}
				{...(rest as Omit<ComponentProps<typeof Link>, 'children' | 'className'>)}
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
