import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    type: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Nom du projet' } }
export const Disabled: Story = { args: { placeholder: 'Désactivé', disabled: true } }
export const Invalid: Story = { args: { placeholder: 'Email', 'aria-invalid': true } }
