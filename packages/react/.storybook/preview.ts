import type { Preview } from '@storybook/react'
import '@fxp/tokens/css/fxp.css'
import '@fxp/tokens/css/fxp.dark.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: { default: 'light' },
  },
}

export default preview
