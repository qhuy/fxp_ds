import type { Preview } from '@storybook/react-vite'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'

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
