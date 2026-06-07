import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './InputText.module.css';

type Props = {
	isCorrect: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const InputText = forwardRef<HTMLInputElement, Props>(function InputText(
	{ isCorrect, ...rest },
	ref
) {
	return (
		<input
			ref={ref}
			type="text"
			className={styles.input}
			data-correct-input={isCorrect}
			{...rest}
		/>
	);
});
