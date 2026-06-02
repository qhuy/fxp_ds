import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('toggles with click', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accepter" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Accepter' })

    await user.click(checkbox)
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
  })
})
