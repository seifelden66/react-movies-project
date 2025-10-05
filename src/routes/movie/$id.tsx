import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { DetailsTemplate } from '@/components/templates/DetailsTemplate';
import { MovieDetailsCard } from '@/components/organisms/MovieDetailsCard';
import { LoadingOverlay } from '@/components/molecules/LoadingOverlay';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { omdbApi, OMDbApiError } from '@/services/omdbApi';
import type { MovieDetails } from '@/types/movie';

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetailsPage,
});

function MovieDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await omdbApi.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        if (err instanceof OMDbApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBack = () => {
    navigate({ to: '/' });
  };

  if (loading) {
    return <LoadingOverlay message="Loading movie details..." />;
  }

  return (
    <DetailsTemplate onBack={handleBack}>
      {error && <ErrorAlert message={error} />}
      {movie && <MovieDetailsCard movie={movie} />}
    </DetailsTemplate>
  );
}
