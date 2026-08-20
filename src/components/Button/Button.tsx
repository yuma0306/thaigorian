import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type CommonProps = {
	color: 'secondary' | 'success';
	children: ReactNode;
	marginInline?: boolean;
};

type ButtonProps = CommonProps & { variant: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & { variant: 'a' } & Omit<
		ComponentProps<typeof Link>,
		'children' | 'className'
	>;

type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
	const { children, variant, color, marginInline = true, ...rest } = props;

	if (variant === 'a') {
		return (
			<Link
				className={styles.button}
				data-color={color}
				data-margin-inline={marginInline}
				{...(rest as Omit<ComponentProps<typeof Link>, 'children' | 'className'>)}
			>
				{children}
			</Link>
		);
	}

	const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button
			className={styles.button}
			data-color={color}
			data-margin-inline={marginInline}
			type={type}
			{...buttonRest}
		>
			{children}
		</button>
	);
}
