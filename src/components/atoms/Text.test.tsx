import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Test Text</Text>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders with default body variant', () => {
    render(<Text>Body Text</Text>);
    const text = screen.getByText('Body Text');
    expect(text).toHaveClass('text-base', 'text-gray-700');
    expect(text.tagName).toBe('P');
  });

  it('renders h1 variant', () => {
    render(<Text variant="h1">Heading 1</Text>);
    const heading = screen.getByText('Heading 1');
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'font-bold', 'text-gray-900');
    expect(heading.tagName).toBe('H1');
  });

  it('renders h2 variant', () => {
    render(<Text variant="h2">Heading 2</Text>);
    const heading = screen.getByText('Heading 2');
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-gray-900');
    expect(heading.tagName).toBe('H2');
  });

  it('renders h3 variant', () => {
    render(<Text variant="h3">Heading 3</Text>);
    const heading = screen.getByText('Heading 3');
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'text-gray-900');
    expect(heading.tagName).toBe('H3');
  });

  it('renders caption variant', () => {
    render(<Text variant="caption">Caption Text</Text>);
    const caption = screen.getByText('Caption Text');
    expect(caption).toHaveClass('text-sm', 'text-gray-600');
    expect(caption.tagName).toBe('P');
  });

  it('applies custom className', () => {
    render(<Text className="custom-text">Custom Text</Text>);
    const text = screen.getByText('Custom Text');
    expect(text).toHaveClass('custom-text');
  });

  it('renders complex children', () => {
    render(
      <Text>
        <span>Complex</span> <strong>Content</strong>
      </Text>
    );
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies all variant styles correctly', () => {
    const variants = [
      { variant: 'h1', expectedClasses: ['text-4xl', 'md:text-5xl', 'font-bold', 'text-gray-900'] },
      { variant: 'h2', expectedClasses: ['text-3xl', 'font-bold', 'text-gray-900'] },
      { variant: 'h3', expectedClasses: ['text-xl', 'font-semibold', 'text-gray-900'] },
      { variant: 'body', expectedClasses: ['text-base', 'text-gray-700'] },
      { variant: 'caption', expectedClasses: ['text-sm', 'text-gray-600'] }
    ];

    variants.forEach(({ variant, expectedClasses }) => {
      const { unmount } = render(<Text variant={variant as any}>Test {variant}</Text>);
      const element = screen.getByText(`Test ${variant}`);
      
      expectedClasses.forEach(className => {
        expect(element).toHaveClass(className);
      });
      
      unmount();
    });
  });

  it('uses correct HTML elements for each variant', () => {
    const { rerender } = render(<Text variant="h1">H1 Text</Text>);
    expect(screen.getByText('H1 Text').tagName).toBe('H1');

    rerender(<Text variant="h2">H2 Text</Text>);
    expect(screen.getByText('H2 Text').tagName).toBe('H2');

    rerender(<Text variant="h3">H3 Text</Text>);
    expect(screen.getByText('H3 Text').tagName).toBe('H3');

    rerender(<Text variant="body">Body Text</Text>);
    expect(screen.getByText('Body Text').tagName).toBe('P');

    rerender(<Text variant="caption">Caption Text</Text>);
    expect(screen.getByText('Caption Text').tagName).toBe('P');
  });
});
