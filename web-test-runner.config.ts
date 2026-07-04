import { defineConfig } from '@web/test-runner/config';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
 files: [
  'packages/core/src/**/*.test.ts',
  'packages/core/src/**/*.spec.ts',
 ],
 nodeResolve: true,
 groups: [{
  name: 'unit',
  files: globSync('packages/core/src/**/*.test.ts', { cwd: root }),
 }],
 coverage: true,
 coverageConfig: {
  exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', '**/*.spec.ts'],
  threshold: {
   statements: 0,
   branches: 0,
   functions: 0,
   lines: 0,
  },
 },
});