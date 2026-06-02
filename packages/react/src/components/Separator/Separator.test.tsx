import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders decorative separator by default', () => {
    render(<Separator data-testid="separator" />)
    expect(screen.getByTestId('separator').getAttribute('data-orientation')).toBe('horizontal')
  })
})
