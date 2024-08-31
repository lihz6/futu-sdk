import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'], // Build for commonJS and ESmodules
  dts: false, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: false,
  clean: true,
});
