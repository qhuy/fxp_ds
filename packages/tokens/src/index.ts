// @fxp/tokens — surface publique
// Export TS du JSON (lecture seule). En attendant Style Dictionary, l'export sert
// uniquement aux outils internes / Storybook. Les apps consomment les CSS vars.

import tokensJson from './tokens.json' with { type: 'json' }

export const tokens = tokensJson
export type Tokens = typeof tokensJson
