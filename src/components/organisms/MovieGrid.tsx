import { MovieCard } from './MovieCard'
import type { Movie } from '@/types/movie'

interface MovieGridProps {
  movies: Movie[]
  onMovieClick: (movie: Movie) => void
}

export const MovieGrid = ({ movies, onMovieClick }: MovieGridProps) => {
  return (
<div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
{movies.map((movie) => (
    <div
      key={movie.imdbID}
      className="
        flex-grow-0 flex-shrink-0
        basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5
      "
    >
      <MovieCard movie={movie} onClick={onMovieClick} />
    </div>
  ))}
</div>

  )
}
