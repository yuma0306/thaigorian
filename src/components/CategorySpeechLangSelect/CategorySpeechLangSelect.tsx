import { Controller, type Control } from 'react-hook-form';
import { speechLangOptions } from '@/constants/speechLangs';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import styles from './CategorySpeechLangSelect.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
};

export function CategorySpeechLangSelect({ control }: Props) {
	return (
		<Controller
			control={control}
			name="speechLang"
			render={({ field }) => (
				<Stack variant="div" size={1} justifyItems="start">
					<label htmlFor="category-speech-lang">
						<Typography size={3} variant="span" color="primary" weight="bold" align="left">
							読み上げ言語
						</Typography>
					</label>
					<select
						id="category-speech-lang"
						className={styles.select}
						required
						{...field}
						value={field.value}
					>
						{speechLangOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</Stack>
			)}
		/>
	);
}
