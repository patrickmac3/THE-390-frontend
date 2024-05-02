import React from 'react'
import { render, screen } from '@testing-library/react'
import LargeTitle from './LargeTitle'
import '@testing-library/jest-dom'

describe('LargeTitle', () => {
  it('renders the title prop inside an h1 tag', () => {
    const testTitle = 'Test Title'
    render(<LargeTitle title={testTitle} />)

    // Check if the title is rendered in an h1 tag
    const titleElement = screen.getByRole('heading', { name: testTitle })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe('H1')
  })

  it('renders the title with specific class', () => {
    const testTitle = 'Class Test Title'
    render(<LargeTitle title={testTitle} />)

    // Check if the h1 tag has the correct class
    const titleElement = screen.getByText(testTitle)
    expect(titleElement).toHaveClass('large-title-text')
  })
})
