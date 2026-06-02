import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Description' } }
export const Invalid: Story = { args: { placeholder: 'Description', 'aria-invalid': true } }
