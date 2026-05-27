import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import type { Situation } from '@/types';
import styles from './CardImage.module.css';

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

type Props = {
	id: Situation['id'];
	title: Situation['title'];
	href: LinkProps['href'];
} & Omit<LinkProps, 'href' | 'children' | 'className'>;

export function CardImage({ title, href, ...rest }: Props) {
	return (
		<Link className={styles.card} href={href} {...rest}>
			<p className={styles.title}>{title}</p>
		</Link>
	);
}
