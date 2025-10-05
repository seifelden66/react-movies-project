import { useState } from 'react';

interface MoviePosterProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

export const MoviePoster = ({ src, alt, size = 'medium' }: MoviePosterProps) => {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    small: 'w-24 h-36',
    medium: 'w-full h-full',
    large: 'w-full h-96'
  };

  if (!src || src === 'N/A' || imageError) {
    return (
      <div className={`${sizes[size]} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} object-cover`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};