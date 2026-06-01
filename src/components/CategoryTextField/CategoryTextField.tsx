import { InputText } from '@/components/InputText/InputText';
import { Stack } from '../Stack/Stack';
import { Typography } from '../Typography/Typography';

type Props = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
};

export function CategoryTextField({ id, label, value, onChange }: Props) {
	return (
		<Stack variant="div" size={1} justifyItems="start">
			<label htmlFor={id}>
				<Typography size={3} variant="span" color="primary" weight="bold" align="left">
					{label}
				</Typography>
			</label>
			<InputText
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				isCorrect={false}
			/>
		</Stack>
	);
}
