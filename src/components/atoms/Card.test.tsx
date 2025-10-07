import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardContent } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies base styles', () => {
    render(<Card>Styled Card</Card>);
    const card = screen.getByText('Styled Card');
    expect(card).toHaveClass('rounded-lg', 'border', 'border-zinc-200', 'bg-white', 'shadow-sm');
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom Card</Card>);
    const card = screen.getByText('Custom Card');
    expect(card).toHaveClass('custom-card');
  });

  it('forwards HTML div attributes', () => {
    render(<Card data-testid="test-card" role="article">Test Card</Card>);
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('role', 'article');
  });

  it('renders as div element', () => {
    render(<Card>Div Card</Card>);
    const card = screen.getByText('Div Card');
    expect(card.tagName).toBe('DIV');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Card Content</CardContent>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies base styles', () => {
    render(<CardContent>Styled Content</CardContent>);
    const content = screen.getByText('Styled Content');
    expect(content).toHaveClass('p-6');
  });

  it('applies custom className', () => {
    render(<CardContent className="custom-content">Custom Content</CardContent>);
    const content = screen.getByText('Custom Content');
    expect(content).toHaveClass('custom-content');
  });

  it('forwards HTML div attributes', () => {
    render(<CardContent data-testid="test-content" role="main">Test Content</CardContent>);
    const content = screen.getByTestId('test-content');
    expect(content).toHaveAttribute('role', 'main');
  });

  it('renders as div element', () => {
    render(<CardContent>Div Content</CardContent>);
    const content = screen.getByText('Div Content');
    expect(content.tagName).toBe('DIV');
  });

  it('works together with Card', () => {
    render(
      <Card>
        <CardContent>Nested Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });
});
