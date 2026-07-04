import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
 root: 'src',
 resolve: {
  alias: {
   '@gds/core': resolve(__dirname, '../../packages/core/src/index.ts'),
  },
 },
 server: {
  port: 3000,
  open: true,
 },
 build: {
  outDir: '../dist',
  emptyOutDir: true,
 },
});