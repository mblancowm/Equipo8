import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import vike from 'vike/plugin';

export default defineConfig({
  plugins: [tailwindcss(), vike()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.WEB_PORT ?? 5173),
    strictPort: true,
    proxy: {
      '/api/v1': {
        target: `http://127.0.0.1:${Number(process.env.API_PORT ?? 3001)}`,
        changeOrigin: false
      }
    }
  }
});
