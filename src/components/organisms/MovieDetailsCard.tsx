import { Badge } from '../atoms/Badge';
import { Text } from '../atoms/Text';
import { MoviePoster } from '../molecules/MoviePoster';
import { Card, CardContent } from '@/components/atoms/Card';
import type { MovieDetails } from '@/types/movie';

interface MovieDetailsCardProps {
  movie: MovieDetails;
}

export const MovieDetailsCard = ({ movie }: MovieDetailsCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <MoviePoster src={movie.Poster} alt={movie.Title} size="large" />
        </div>
        <CardContent className="md:w-2/3 p-8">
          <Text variant="h2" className="mb-2">{movie.Title}</Text>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="blue">{movie.Year}</Badge>
            {movie.Rated && movie.Rated !== 'N/A' && (
              <Badge variant="green">{movie.Rated}</Badge>
            )}
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <Badge variant="purple">{movie.Runtime}</Badge>
            )}
          </div>

          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className="mb-4">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Genre
              </Text>
              <Text>{movie.Genre}</Text>
            </div>
          )}

          {movie.Director && movie.Director !== 'N/A' && (
            <div className="mb-4">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Director
              </Text>
              <Text>{movie.Director}</Text>
            </div>
          )}

          {movie.Actors && movie.Actors !== 'N/A' && (
            <div className="mb-4">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Cast
              </Text>
              <Text>{movie.Actors}</Text>
            </div>
          )}

          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="mb-4">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Plot
              </Text>
              <Text className="leading-relaxed">{movie.Plot}</Text>
            </div>
          )}

          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center gap-2 mt-6">
              <span className="text-2xl font-bold text-yellow-500">★</span>
              <span className="text-xl font-semibold text-gray-900">
                {movie.imdbRating}
              </span>
              <Text variant="caption">/ 10</Text>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
