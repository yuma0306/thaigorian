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
	name: 'Log in',
	args: {
		mode: 'signin',
		disabled: false
	}
};

export const SignUp: Story = {
	name: 'Sign up',
	args: {
		mode: 'signup',
		disabled: false
	}
};

export const Disabled: Story = {
	name: 'Disabled',
	args: {
		mode: 'signin',
		disabled: true
	}
};
