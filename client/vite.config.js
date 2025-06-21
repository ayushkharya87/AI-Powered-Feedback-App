import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:5000',
      '/api': 'https://ai-powered-feedback-app.onrender.com',
    },
  },
});
