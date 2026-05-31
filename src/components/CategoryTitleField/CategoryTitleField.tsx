import { InputText } from '@/components/InputText/InputText';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export function CategoryTitleField({ value, onChange }: Props) {
	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor="category-title">
				タイトル
			</label>
			<InputText
				id="category-title"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				isCorrect={false}
			/>
		</div>
	);
}
