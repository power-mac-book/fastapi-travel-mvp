import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      strict: false,
    },
    // 👇 Add this line to fix 404 on routing
    historyApiFallback: true,
  },
});
