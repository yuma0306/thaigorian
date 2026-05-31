import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { paths } from '@/constants/paths';
import { Crumbs } from './Crumbs';

const meta = {
	title: 'Components/Crumbs',
	component: Crumbs
} satisfies Meta<typeof Crumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SingleLevel: Story = {
	name: '1階層',
	args: {
		items: [{ text: '1階層', href: '#' }]
	}
};

export const TwoLevels: Story = {
	name: '2階層',
	args: {
		items: [
			{ text: '1階層', href: '#' },
			{ text: '2階層', href: '#' }
		]
	}
};
