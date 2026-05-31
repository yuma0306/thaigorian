import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/reset.css';
import '@/styles/app.css';

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
