import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useQueries } from '@tanstack/react-query';
import { SearchTemplate } from '@/components/templates/SearchTemplate';
import { MovieGrid } from '@/components/organisms/MovieGrid';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { omdbApi, OMDbApiError } from '@/services/omdbApi';
import type { Movie } from '@/types/movie';

export const Route = createFileRoute('/')({
  component: SearchPage,
});

const INITIAL_SEARCHES = ['Marvel', 'Star Wars', 'Harry Potter', 'Batman', 'Spider'];
const MOVIES_PER_LOAD = 10;

function SearchPage() {
  useEffect(() => {
    document.title = "Search Movies – Seif's Movies";
  }, []);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDisplayCount, setCurrentDisplayCount] = useState(MOVIES_PER_LOAD);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const popularMoviesQueries = useQueries({
    queries: INITIAL_SEARCHES.map((search) => ({
      queryKey: ['movies', 'search', search],
      queryFn: () => omdbApi.searchMovies(search),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: !searchTerm.trim(),
    })),
  });

  const searchQuery = useQuery({
    queryKey: ['movies', 'search', debouncedSearchTerm],
    queryFn: () => omdbApi.searchMovies(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm.trim(),
    staleTime: 1000 * 60 * 5,
  });

  // Deduplicate movies from multiple search results
  const popularMovies = useMemo(() => {
    if (searchTerm.trim()) return [];

    const allMovies: Movie[] = [];
    
    popularMoviesQueries.forEach((query) => {
      if (query.data?.Search) {
        allMovies.push(...query.data.Search.slice(0, 4));
      }
    });

    const uniqueMovies = allMovies.filter((movie, index, self) =>
      index === self.findIndex((m) => m.imdbID === movie.imdbID)
    );

    return uniqueMovies;
  }, [popularMoviesQueries, searchTerm]);

  const movies = searchTerm.trim() ? (searchQuery.data?.Search || []) : popularMovies;
  const displayedMovies = searchTerm.trim() 
    ? movies 
    : movies.slice(0, currentDisplayCount);

  const isInitialLoading = !searchTerm.trim() && popularMoviesQueries.some(q => q.isLoading);
  const isSearchLoading = !!searchTerm.trim() && searchQuery.isLoading;
  const isLoading = isInitialLoading || isSearchLoading;

  const searchError = searchQuery.error instanceof OMDbApiError 
    ? searchQuery.error.message 
    : searchQuery.error 
    ? 'An unexpected error occurred' 
    : null;

  const handleMovieClick = useCallback((movie: Movie) => {
    navigate({ to: '/movie/$id', params: { id: movie.imdbID } });
  }, [navigate]);

  const handleLoadMore = () => {
    setCurrentDisplayCount(prev => prev + MOVIES_PER_LOAD);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      setCurrentDisplayCount(MOVIES_PER_LOAD);
    }
  }, [searchTerm]);

  const showEmptyState = !isLoading && displayedMovies.length === 0 && !searchError && searchTerm.trim();
  const hasMoreMovies = !searchTerm.trim() && displayedMovies.length < movies.length;

  return (
    <SearchTemplate
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      error={searchError ? <ErrorAlert message={searchError} /> : null}
    >
      {isLoading && (
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

      {!isLoading && displayedMovies.length > 0 && (
        <>
          {!searchTerm && (
            <div className="mb-6 px-4">
              <Text variant="h2" className="text-center">Popular Movies</Text>
              <Text variant="caption" className="text-center block mt-2">
                Discover trending movies or search for your favorites above
              </Text>
            </div>
          )}
          <MovieGrid movies={displayedMovies} onMovieClick={handleMovieClick} />
          
          {hasMoreMovies && (
            <div className="flex justify-center mt-8 mb-4">
              <Button onClick={handleLoadMore} variant="primary">
                Load More Movies
              </Button>
            </div>
          )}
        </>
      )}
    </SearchTemplate>
  );
}