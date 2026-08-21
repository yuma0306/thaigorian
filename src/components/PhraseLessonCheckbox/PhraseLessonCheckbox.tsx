import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './PhraseLessonCheckbox.module.css';

type Props = {
	checked: boolean;
	onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
	children?: ReactNode;
	isAbsolute?: boolean;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'aria-label'>;

export function PhraseLessonCheckbox({
	checked,
	onChange,
	children,
	isAbsolute,
	'aria-label': ariaLabel
}: Props) {
	return (
		<label className={styles.label} data-is-absolute={isAbsolute}>
			<input
				type="checkbox"
				className={styles.input}
				checked={checked}
				onChange={onChange}
				aria-label={ariaLabel}
			/>
			{children}
		</label>
	);
}
