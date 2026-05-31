import { InputText } from '@/components/InputText/InputText';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';

type Props = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
};

export function CategoryTextField({ id, label, value, onChange }: Props) {
	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<InputText
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				isCorrect={false}
			/>
		</div>
	);
}
