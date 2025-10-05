import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from '../molecules/MovieCardSkeleton'
import type { Movie } from '@/types/movie'

interface MovieGridProps {
  movies: Movie[]
  onMovieClick: (movie: Movie) => void
  isLoading?: boolean
}

export const MovieGrid = ({ movies, onMovieClick, isLoading }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
      {isLoading ? (
        <MovieCardSkeleton count={10} />
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
        ))
      )}
    </div>
  )
}