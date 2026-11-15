import { Controller, type Control, type FieldPath } from 'react-hook-form';
import type { ReactNode } from 'react';
import { InputText } from '@/components/InputText/InputText';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import { Stack } from '../Stack/Stack';
import { Typography } from '../Typography/Typography';
import styles from './CategoryTextField.module.css';

type Props = {
	id: string;
	name: FieldPath<CategoryRegisterFormValues>;
	control: Control<CategoryRegisterFormValues>;
	inputLabel: string;
	placeholder?: string;
	label?: ReactNode;
	labelAction?: ReactNode;
};

export function CategoryTextField({
	id,
	name,
	control,
	inputLabel,
	placeholder,
	label,
	labelAction
}: Props) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Stack variant="div" size={1} justifyItems="start">
					{label !== undefined || labelAction !== undefined ? (
						<div className={styles.labelRow}>
							<label htmlFor={id} aria-label={inputLabel}>
								{typeof label === 'string' ? (
									<Typography
										size={2}
										variant="span"
										color="primary"
										weight="bold"
										align="left"
									>
										{label}
									</Typography>
								) : (
									label
								)}
							</label>
							{labelAction}
						</div>
					) : null}
					<InputText
						id={id}
						isCorrect={false}
						{...field}
						value={field.value as string}
						aria-label={inputLabel}
						{...(placeholder !== undefined ? { placeholder } : {})}
					/>
				</Stack>
			)}
		/>
	);
}
