import * as path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  root: 'demo',
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      'atomic-router-solid': path.resolve(__dirname, './src'),
    },
  },
});
