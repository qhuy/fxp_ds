import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../Label'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accepter</Label>
    </div>
  ),
}

export const Checked: Story = { args: { checked: true, 'aria-label': 'Option cochée' } }
export const Invalid: Story = { args: { 'aria-invalid': true, 'aria-label': 'Option invalide' } }
