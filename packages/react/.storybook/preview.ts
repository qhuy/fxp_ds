import type { Preview } from '@storybook/react-vite'
import '@fxp/tokens/css/fxp.css'
import '@fxp/tokens/css/fxp.dark.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {},
  },

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
}

export default preview
