import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../Label'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Switch id="notifications" />
      <Label htmlFor="notifications">Notifications</Label>
    </div>
  ),
}

export const Checked: Story = { args: { checked: true, 'aria-label': 'Notifications activées' } }
