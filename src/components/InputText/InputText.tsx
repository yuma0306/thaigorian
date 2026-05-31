import type { InputHTMLAttributes } from 'react';
import styles from './InputText.module.css';

type Props = {
	isCorrect: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function InputText({ isCorrect, ...rest }: Props) {
	return <input type="text" className={styles.input} data-correct-input={isCorrect} {...rest} />;
}
