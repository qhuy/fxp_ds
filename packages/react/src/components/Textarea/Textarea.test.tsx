import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders native textarea props', () => {
    render(<Textarea aria-label="Description" maxLength={140} />)
    expect(screen.getByRole('textbox', { name: 'Description' }).getAttribute('maxlength')).toBe(
      '140',
    )
  })
})
