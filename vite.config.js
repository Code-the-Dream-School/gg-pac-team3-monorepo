import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../server/public'), // Outputs React build to the server's public folder
    emptyOutDir: true, // Clears the output directory before each build
  },
});
