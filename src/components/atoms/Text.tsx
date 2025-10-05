import type { ReactNode } from 'react';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: ReactNode;
  className?: string;
}

export const Text = ({ variant = 'body', children, className = '' }: TextProps) => {
  const variants = {
    h1: 'text-4xl md:text-5xl font-bold text-gray-900',
    h2: 'text-3xl font-bold text-gray-900',
    h3: 'text-xl font-semibold text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-600'
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};
