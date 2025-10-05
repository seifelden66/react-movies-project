import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DetailsTemplate } from '@/components/templates/DetailsTemplate';
import { MovieDetailsCard } from '@/components/organisms/MovieDetailsCard';
import { MovieDetailsSkeleton } from '@/components/molecules/MovieDetailsSkeleton';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { omdbApi, OMDbApiError } from '@/services/omdbApi';

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetailsPage,
});

function MovieDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', 'details', id],
    queryFn: () => omdbApi.getMovieDetails(id),
    staleTime: 1000 * 60 * 10, 
  });

  useEffect(() => {
    if (movie?.Title) {
      document.title = `${movie.Title} (${movie.Year}) – Seif's Movies`;
    } else {
      document.title = "Movie Details – Seif's Movies";
    }
  }, [movie]);

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const errorMessage = error instanceof OMDbApiError 
    ? error.message 
    : error 
    ? 'An unexpected error occurred' 
    : null;

  return (
    <DetailsTemplate onBack={handleBack}>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {isLoading && <MovieDetailsSkeleton />}
      {movie && !isLoading && <MovieDetailsCard movie={movie} />}
    </DetailsTemplate>
  );
}