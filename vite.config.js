import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
    base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@layout': path.resolve(__dirname, './src/components/layout'),
			'@ui': path.resolve(__dirname, './src/components/ui'),
			'@screens': path.resolve(__dirname, './src/components//screens'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@providers': path.resolve(__dirname, './src/providers'),
		},
	},
})
