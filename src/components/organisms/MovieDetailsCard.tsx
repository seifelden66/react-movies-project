import { Badge } from '../atoms/Badge';
import { Text } from '../atoms/Text';
import { MoviePoster } from '../molecules/MoviePoster';
import type { MovieDetails } from '@/types/movie';

interface MovieDetailsCardProps {
  movie: MovieDetails;
}

export const MovieDetailsCard = ({ movie }: MovieDetailsCardProps) => {
  return (
    <section className="overflow-hidden" aria-label="Movie details">
      <div className="md:flex">
        <aside className="md:w-1/3">
          <MoviePoster src={movie.Poster} alt={movie.Title} size="large" />
        </aside>
        <article className="md:w-2/3 p-8">
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
            <section className="mb-4" aria-label="Genre">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Genre
              </Text>
              <Text>{movie.Genre}</Text>
            </section>
          )}
          {movie.Director && movie.Director !== 'N/A' && (
            <section className="mb-4" aria-label="Director">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Director
              </Text>
              <Text>{movie.Director}</Text>
            </section>
          )}
          {movie.Actors && movie.Actors !== 'N/A' && (
            <section className="mb-4" aria-label="Cast">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Cast
              </Text>
              <Text>{movie.Actors}</Text>
            </section>
          )}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <section className="mb-4" aria-label="Plot">
              <Text variant="h3" className="text-sm font-semibold text-gray-600 mb-1">
                Plot
              </Text>
              <Text className="leading-relaxed">{movie.Plot}</Text>
            </section>
          )}
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center gap-2 mt-6">
              <span className="text-2xl font-bold text-yellow-500" aria-label="IMDB star">★</span>
              <span className="text-xl font-semibold text-gray-900">
                {movie.imdbRating}
              </span>
              <Text variant="caption">/ 10</Text>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
