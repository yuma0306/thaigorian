import type { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import styles from './CardImage.module.css';

type CommonProps = {
	id: string;
	title: string;
};

type LinkProps = CommonProps & {
	variant?: 'a';
	href: ComponentPropsWithoutRef<typeof Link>['href'];
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'children' | 'className' | 'id'>;

type ButtonProps = CommonProps & {
	variant: 'button';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'id'>;

type Props = LinkProps | ButtonProps;

export function CardImage(props: Props) {
	const { title, id, variant = 'a', ...rest } = props;

	if (variant === 'button') {
		const { type = 'button', ...buttonRest } = rest as Omit<
			ButtonHTMLAttributes<HTMLButtonElement>,
			'children' | 'className' | 'id'
		>;
		return (
			<button className={styles.card} id={id} type={type} {...buttonRest}>
				<p className={styles.title}>{title}</p>
			</button>
		);
	}

	const { href, ...linkRest } = rest as Omit<
		LinkProps,
		'id' | 'title' | 'variant' | 'children' | 'className'
	>;
	return (
		<Link className={styles.card} id={id} href={href} {...linkRest}>
			<p className={styles.title}>{title}</p>
		</Link>
	);
}
