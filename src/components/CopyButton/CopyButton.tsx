'use client';

import type { Phrase } from '@/types/database';
import { CopyIcon } from '@/components/Icon/CopyIcon';
import { useToast } from '@/hooks/useToast';
import styles from './CopyButton.module.css';

type Props = {
	text: Phrase['phrase'];
};

export function CopyButton({ text }: Props) {
	const { showToast } = useToast();
	async function copyToClipboard(value: string) {
		try {
			await navigator.clipboard.writeText(value);
			showToast(`「${value}」をコピーしました`);
		} catch {
			showToast('コピーに失敗しました', 'error');
		}
	}
	if (!text) return null;
	return (
		<button
			type="button"
			className={styles.button}
			onClick={() => {
				void copyToClipboard(text);
			}}
			aria-label="コピー"
			title="コピー"
		>
			<CopyIcon />
		</button>
	);
}
