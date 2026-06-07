import { Controller, type Control, type FieldPath } from 'react-hook-form';
import type { ReactNode } from 'react';
import { InputText } from '@/components/InputText/InputText';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import { Stack } from '../Stack/Stack';
import { Typography } from '../Typography/Typography';
import styles from './CategoryTextField.module.css';

type Props = {
	id: string;
	label: string;
	name: FieldPath<CategoryRegisterFormValues>;
	control: Control<CategoryRegisterFormValues>;
	labelAction?: ReactNode;
};

export function CategoryTextField({ id, label, name, control, labelAction }: Props) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Stack variant="div" size={1} justifyItems="start">
					<div className={styles.labelRow}>
						<label htmlFor={id}>
							<Typography size={3} variant="span" color="primary" weight="bold" align="left">
								{label}
							</Typography>
						</label>
						{labelAction}
					</div>
					<InputText id={id} isCorrect={false} {...field} value={field.value as string} />
				</Stack>
			)}
		/>
	);
}
