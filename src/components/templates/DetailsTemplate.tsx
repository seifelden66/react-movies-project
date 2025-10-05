import type { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button';

interface DetailsTemplateProps {
  onBack: () => void;
  children: ReactNode;
}

export const DetailsTemplate = ({ onBack, children }: DetailsTemplateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Results
        </Button>
        {children}
      </div>
    </div>
  );
};