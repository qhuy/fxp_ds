import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from '../Input'
import { Label } from './Label'

describe('Label', () => {
  it('labels an input', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>,
    )

    expect(screen.getByLabelText('Email').getAttribute('id')).toBe('email')
  })
})
