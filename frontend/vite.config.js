import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8000',     // Your Spring Boot backend
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api'),  // optional if paths match
      },
    },
  },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
    },
  },
});