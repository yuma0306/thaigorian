'use client';

import styles from './Input.module.css';

type Props = {
	isCorrect: boolean;
	userInput: string;
	onUserInputChange: (value: string) => void;
};

export function Input({ isCorrect, userInput, onUserInputChange }: Props) {
	return (
		<div className={styles.wrapper} data-correct-input={isCorrect}>
			<input
				type="text"
				className={styles.input}
				value={userInput}
				onChange={(e) => onUserInputChange(e.target.value)}
				placeholder="タイ文字を入力！"
				lang="th"
				disabled={isCorrect}
			/>
		</div>
	);
}
