import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Altere para a porta correta do backend
        changeOrigin: true,
        secure: false, // Permite conexões HTTP
      },
    },
  },
});
