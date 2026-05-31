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
			<input
				className={styles.input}
				id={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}
