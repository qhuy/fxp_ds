import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders a textbox by default', () => {
    render(<Input aria-label="Nom" />)
    expect(screen.getByRole('textbox', { name: 'Nom' }).className).toContain('fxp-input')
  })

  it('passes native input props', () => {
    render(<Input aria-label="Email" type="email" required />)
    expect(screen.getByRole('textbox', { name: 'Email' }).hasAttribute('required')).toBe(true)
  })
})
