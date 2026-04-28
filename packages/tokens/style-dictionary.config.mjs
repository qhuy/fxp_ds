/**
 * Style Dictionary 4 — pipeline DTCG → CSS + TS
 *
 * Source : `src/tokens.json` (format DTCG W3C natif, $value/$type)
 * Outputs :
 *   - dist/css/fxp.css        → CSS vars `:root { --fxp-* }` (consommé par @fxp/react)
 *   - dist/tokens.js          → const { color, space, ... } pour code interne
 *   - dist/tokens.d.ts        → déclarations TS associées
 *
 * `dist/css/fxp.dark.css` est copié post-build par le script `pnpm build` (cf. package.json).
 * Le multi-thème via `$themes` Tokens Studio sera traité dans la feature `architecture/tokens-multi-tenant`.
 *
 * Convention naming : `--fxp-{category}-{role}-{shade-or-state}` (cf. .ai/rules/architecture.md)
 */

/** @type {import('style-dictionary/types').Config} */
export default {
  source: ['src/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      prefix: 'fxp',
      files: [
        {
          destination: 'fxp.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      prefix: 'fxp',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
}
