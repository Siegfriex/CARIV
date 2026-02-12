import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    define: {
      'import.meta.env.VITE_RUN_DEV': JSON.stringify(env.VITE_RUN_DEV ?? '')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './img'),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'tanstack-vendor': ['@tanstack/react-query'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    css: { postcss: './postcss.config.js' },
  };
});