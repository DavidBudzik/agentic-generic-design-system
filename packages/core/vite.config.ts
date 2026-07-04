import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';

/**
 * Vite plugin to copy static CSS files from src/styles to dist after build.
 */
function copyStylesPlugin{
 return {
  name: 'copy-styles',
  closeBundle{
   const srcDir = resolve(__dirname, 'src/styles');
   const outDir = resolve(__dirname, 'dist');
   if (!existsSync(srcDir)) return;
   if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
   for (const file of readdirSync(srcDir)) {
    if (file.endsWith('.css')) {
     copyFileSync(resolve(srcDir, file), resolve(outDir, file));
    }
   }
  },
 };
}

export default defineConfig({
 build: {
  lib: {
   entry: resolve(__dirname, 'src/index.ts'),
   formats: ['es'],
   fileName: => 'index.js',
  },
  rollupOptions: {
   external: ['lit'],
   output: {
    preserveModules: true,
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].js',
    assetFileNames: '[name][extname]',
   },
  },
  target: 'es2022',
  sourcemap: true,
  minify: false,
 },
 plugins: [copyStylesPlugin()],
});