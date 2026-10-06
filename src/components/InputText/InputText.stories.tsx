import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InputText } from './InputText';

const meta = {
	title: 'Components/InputText',
	component: InputText,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	args: {
		isCorrect: false,
		placeholder: 'Enter text',
		value: '',
		disabled: false
	}
};

export const Correct: Story = {
	name: 'Correct',
	args: {
		isCorrect: true,
		value: 'สวัสดี',
		disabled: true,
		placeholder: 'Type Thai here',
		lang: 'th'
	}
};
