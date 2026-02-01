import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import AppContainer from '../AppContainer'

describe('AppContainer author extraction', () => {
  test('renders extracted author names from various author formats', () => {
    const photos = [
      { title: 'One', media: { m: 'https://example.com/1.jpg' }, author: 'nobody@flickr.com ("Jane Doe")', link: '#' },
      { title: 'Two', media: { m: 'https://example.com/2.jpg' }, author: 'John Smith (jsmith)', link: '#' },
      { title: 'Three', media: { m: 'https://example.com/3.jpg' }, author: '"Quoted Author"', link: '#' }
    ]

    const { container } = render(<AppContainer photos={photos} />)

    const authorEls = container.querySelectorAll('.photo-author')
    expect(authorEls.length).toBe(3)

    const texts = Array.from(authorEls).map(el => el.textContent.trim())
    expect(texts).toContain('Jane Doe')
    expect(texts).toContain('jsmith')
    expect(texts).toContain('Quoted Author')
  })
})
