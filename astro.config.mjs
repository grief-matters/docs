import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Why Grief Matters',
			social: {
				github: 'https://github.com/grief-matters',
			},
			sidebar: [
				{
					label: 'Content Editing',
					autogenerate: { directory: 'content-editing' },
				},
				{
					label: 'Development',
					autogenerate: { directory: 'development' },
				},
			],
		}),
	],
});
