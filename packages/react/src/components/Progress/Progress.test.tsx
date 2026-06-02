import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Progress } from './Progress'

describe('Progress', () => {
  it('sets the progress value', () => {
    render(<Progress value={40} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('40')
  })
})
