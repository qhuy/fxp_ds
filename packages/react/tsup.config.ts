import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // "use client" prepended to all output files (RSC-compatible)
  banner: { js: '"use client";' },
  // CSS imports in .tsx are bundled by esbuild into dist/index.css
})
