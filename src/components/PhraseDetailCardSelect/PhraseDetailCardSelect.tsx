import type { ReactNode } from 'react';
import { PhraseLessonCheckbox } from '@/components/PhraseLessonCheckbox/PhraseLessonCheckbox';
import styles from './PhraseDetailCardSelect.module.css';

type Props = {
	checked: boolean;
	onCheckedChange: () => void;
	children: ReactNode;
};

export function PhraseDetailCardSelect({ checked, onCheckedChange, children }: Props) {
	return (
		<div className={styles.row}>
			<PhraseLessonCheckbox
				checked={checked}
				onChange={onCheckedChange}
				aria-label="レッスンに含める"
			/>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
