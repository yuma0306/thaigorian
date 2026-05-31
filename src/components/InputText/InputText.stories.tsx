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
	name: 'デフォルト',
	args: {
		isCorrect: false,
		placeholder: 'テキストを入力',
		value: '',
		disabled: false
	}
};

export const Correct: Story = {
	name: '正解',
	args: {
		isCorrect: true,
		value: 'สวัสดี',
		disabled: true,
		placeholder: 'タイ文字を入力！',
		lang: 'th'
	}
};
