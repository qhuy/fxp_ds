import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar, AvatarFallback } from './Avatar'

describe('Avatar', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>BD</AvatarFallback>
      </Avatar>,
    )

    expect(screen.getByText('BD').getAttribute('data-slot')).toBe('avatar-fallback')
  })
})
