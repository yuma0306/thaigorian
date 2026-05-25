'use client';

import { useState } from 'react';
import type { Phrase } from '@/lib/types';
import { CopyIcon } from '@/lib/components/Icon/CopyIcon';
import styles from './CopyButton.module.css';

type Props = {
	text: Phrase['phrase'];
};

export function CopyButton({ text }: Props) {
	const [copied, setCopied] = useState(false);

	async function copyToClipboard(value: string) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	if (!text) return null;

	return (
		<button
			type="button"
			className={styles.button}
			onClick={() => copyToClipboard(text)}
			title={copied ? 'コピーしました！' : 'コピー'}
		>
			<CopyIcon />
		</button>
	);
}
