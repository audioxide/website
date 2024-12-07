import type { Preview } from '@storybook/svelte';

import '../src/lib/styles/global.css';
import '../src/lib/styles/fonts.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
