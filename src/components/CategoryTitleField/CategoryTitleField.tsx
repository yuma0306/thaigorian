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
			<input
				className={styles.input}
				id="category-title"
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}
