import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import compress from 'vite-plugin-compression'
import svgrPlugin from 'vite-plugin-svgr'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

const common = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      ...common,
      plugins: [
        react(),
        compress(),
        svgrPlugin({
          svgrOptions: {
            icon: true, // ...svgr options (https://react-svgr.com/docs/options/)
          },
        }),
        createSvgIconsPlugin({
          // Specify the icon folder to be cached
          iconDirs: [ resolve(process.cwd(), 'src/assets/icons') ],
          // Specify symbolId format
          symbolId: 'icon-[name]',
        }),
      ],
    }
  }
  return {
    ...common,
    plugins: [
      react(),
      eslintPlugin(),
      svgrPlugin({
        svgrOptions: { icon: true },
      }),
    ],
  }
})
