import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Crumbs } from './Crumbs';

const meta = {
	title: 'Components/Crumbs',
	component: Crumbs
} satisfies Meta<typeof Crumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SingleLevel: Story = {
	name: '1 level',
	args: {
		items: [{ text: '1 level', href: '#' }]
	}
};

export const TwoLevels: Story = {
	name: '2 levels',
	args: {
		items: [
			{ text: '1 level', href: '#' },
			{ text: '2 levels', href: '#' }
		]
	}
};
