import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  it('toggles with click', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Notifications" />)
    const control = screen.getByRole('switch', { name: 'Notifications' })

    await user.click(control)
    expect(control.getAttribute('aria-checked')).toBe('true')
  })
})
