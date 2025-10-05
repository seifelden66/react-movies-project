import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { SearchTemplate } from '@/components/templates/SearchTemplate';
import { MovieGrid } from '@/components/organisms/MovieGrid';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { useDebounce } from '@/hooks/useDebounce';
import { omdbApi, OMDbApiError } from '@/services/omdbApi';
import type { Movie } from '@/types/movie';

export const Route = createFileRoute('/')({
  component: SearchPage,
});

function SearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await omdbApi.searchMovies(query);
      setMovies(data.Search);
    } catch (err) {
      if (err instanceof OMDbApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchMovies]);

  const handleMovieClick = useCallback((movie: Movie) => {
    navigate({ to: '/movie/$id', params: { id: movie.imdbID } });
  }, [navigate]);

  const showEmptyState = !loading && movies.length === 0 && !error && searchTerm.trim();

  return (
    <SearchTemplate
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      error={error ? <ErrorAlert message={error} /> : null}
    >
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {showEmptyState && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <Text className="text-gray-500 text-lg">
            No movies found. Try a different search term.
          </Text>
        </div>
      )}

      {!loading && movies.length === 0 && !searchTerm.trim() && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <Text className="text-gray-500 text-lg">
            Start by searching for your favorite movies
          </Text>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
      )}
    </SearchTemplate>
  );
}
