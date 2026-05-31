import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoogleSignInButton } from './GoogleSignInButton';

const meta = {
	title: 'Components/GoogleSignInButton',
	component: GoogleSignInButton,
	argTypes: {
		mode: {
			control: 'select',
			options: ['signin', 'signup']
		},
		disabled: { control: 'boolean' }
	}
} satisfies Meta<typeof GoogleSignInButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
	name: 'ログイン',
	args: {
		mode: 'signin',
		disabled: false
	}
};

export const SignUp: Story = {
	name: '会員登録',
	args: {
		mode: 'signup',
		disabled: false
	}
};

export const Disabled: Story = {
	name: '無効化',
	args: {
		mode: 'signin',
		disabled: true
	}
};
