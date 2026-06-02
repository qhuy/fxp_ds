import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-vitest')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      dedupe: [...(config.resolve?.dedupe ?? []), 'react', 'react-dom'],
    }

    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
    }

    return config
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
