import { Badge } from '../atoms/Badge';
import { Text } from '../atoms/Text';
import { MoviePoster } from '../molecules/MoviePoster';
import { Card, CardContent } from '@/components/atoms/Card';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <Card 
      onClick={() => onClick(movie)}
      className="overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative pb-[150%]">
        <div className="absolute inset-0">
          <MoviePoster src={movie.Poster} alt={movie.Title} />
        </div>
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
};