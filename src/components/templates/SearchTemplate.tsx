import type { ReactNode } from 'react';
import { Text } from '../atoms/Text';
import { SearchBar } from '../molecules/SearchBar';

interface SearchTemplateProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  children: ReactNode;
  error?: ReactNode;
}

export const SearchTemplate = ({ 
  searchValue, 
  onSearchChange, 
  children,
  error 
}: SearchTemplateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <Text variant="h1">Movie Search</Text>
          </div>
          <Text variant="caption">Discover movies powered by OMDb API</Text>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search for movies..."
          />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            {error}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};