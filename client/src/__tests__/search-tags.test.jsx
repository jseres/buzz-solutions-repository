import React from 'react'
import '@testing-library/jest-dom'
import { screen, fireEvent, render } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

// Use Vitest globals (vi, expect, describe, test) provided by the test runner
vi.mock('axios')

describe('Search behavior', () => {
  test('every picture returned after searching contains the searched tag (by item tags)', async () => {
    const tag = 'cat'

    const items = [
      { title: 'One', media: { m: 'https://example.com/img1.jpg' }, author: 'A', link: '#', tags: 'cat beach' },
      { title: 'Two', media: { m: 'https://example.com/img2.jpg' }, author: 'B', link: '#', tags: 'cat dog' },
      { title: 'Three', media: { m: 'https://example.com/img3.jpg' }, author: 'C', link: '#', tags: 'cat' }
    ]

    // First call: initial load -> empty list
    // Second call: search -> our test items
    axios.get
      .mockResolvedValueOnce({ data: { items: [] } })
      .mockResolvedValueOnce({ data: { items } })

    const { container } = render(<App />)

    // find the input by its aria-label and type the tag
    const input = screen.getByLabelText(/search tags/i)
    // set value and submit the surrounding form
    fireEvent.change(input, { target: { value: tag } })
    const form = container.querySelector('form')
    expect(form).toBeTruthy()
    fireEvent.submit(form)

    // wait for images to render (one img per item)
    // Use DOM query because role-based queries returned inconsistent counts in this environment
    const images = await screen.findAllByRole('img')
    const domImages = container.querySelectorAll('.photo-card img')
    expect(domImages.length).toBe(items.length)

    // For each rendered image element, match by src to the mocked items and verify tags
    for (const imgEl of domImages) {
      const src = imgEl.getAttribute('src')
      const matched = items.find(i => i.media.m === src)
      expect(matched).toBeDefined()
      expect((matched.tags || '').toLowerCase()).toContain(tag)
    }
  })
})
