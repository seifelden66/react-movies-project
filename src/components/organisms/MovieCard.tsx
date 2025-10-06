import { Badge } from '../atoms/Badge';
import { Text } from '../atoms/Text';
import { MoviePoster } from '../molecules/MoviePoster';
import { Card, CardContent } from '@/components/atoms/Card';
import type { Movie } from '@/types/movie';
import { memo } from 'react';
import { Heart } from 'lucide-react';
import { favouritesActions, useIsFavourite } from '@/stores/favourites';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = memo(({ movie, onClick }: MovieCardProps) => {
  const isFavourite = useIsFavourite(movie.imdbID);
  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    favouritesActions.toggle(movie);
  };

  return (
    <Card 
      onClick={() => onClick(movie)}
      className="overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform"
    >
      <div className="relative pb-[150%]">
        <div className="absolute inset-0">
          <MoviePoster src={movie.Poster} alt={movie.Title} />
        </div>
        <button
          onClick={handleToggleFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
        >
          <Heart
            size={20}
            className={isFavourite ? 'text-red-500 fill-red-500' : 'text-white'}
          />
        </button>
      </div>
      <CardContent className="p-4">
        <Text variant="h3" className="truncate text-base">
          {movie.Title}
        </Text>
        <Text variant="caption" className="mt-1">{movie.Year}</Text>
        <div className="mt-2">
          <Badge>{movie.Type}</Badge>
        </div>
      </CardContent>
    </Card>
  );
});