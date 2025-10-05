import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'blue' | 'green' | 'purple' | 'yellow';
  children: ReactNode;
}

export const Badge = ({ variant = 'blue', children }: BadgeProps) => {
  const variants = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${variants[variant]}`}>
      {children}
    </span>
  );
};