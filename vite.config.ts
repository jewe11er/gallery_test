import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import compress from 'vite-plugin-compression'
import svgrPlugin from 'vite-plugin-svgr'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const common = {
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
}

const plugins = [
	react(),
	svgrPlugin({
		svgrOptions: {
			icon: true,
		},
	}),
	createSvgIconsPlugin({
    // Specify the icon folder to be cached
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // Specify symbolId format
    symbolId: 'icon-[name]',
  }),
]

export default defineConfig(({ command }) => {
	if (command === 'build') {
		return {
			...common,
			plugins: [
				compress(),
				...plugins
			],
		}
	}
	return {
		...common,
		plugins: [
			eslintPlugin(),
			...plugins
		],
	}
})
