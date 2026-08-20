import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './PhraseLessonCheckbox.module.css';

type Props = {
	checked: boolean;
	onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
	children?: ReactNode;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'aria-label'>;

export function PhraseLessonCheckbox({ checked, onChange, children, 'aria-label': ariaLabel }: Props) {
	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				className={styles.checkbox}
				checked={checked}
				onChange={onChange}
				aria-label={ariaLabel}
			/>
			{children}
		</label>
	);
}
