import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:7500',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    }
  },
  plugins: [react()]
})