import type { ReactNode } from 'react';
import { PhraseLessonCheckbox } from '@/components/PhraseLessonCheckbox/PhraseLessonCheckbox';

type Props = {
	checked: boolean;
	onCheckedChange: () => void;
	children: ReactNode;
};

export function PhraseDetailCardSelect({ checked, onCheckedChange, children }: Props) {
	return (
		<>
			<PhraseLessonCheckbox
				checked={checked}
				onChange={onCheckedChange}
				aria-label="レッスンに含める"
				isAbsolute
			/>
			{children}
		</>
	);
}
