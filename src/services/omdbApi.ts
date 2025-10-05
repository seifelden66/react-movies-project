import type { MovieSearchResponse, MovieDetailsResponse } from '@/types/movie';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export class OMDbApiError extends Error {
  constructor(message: string, public isRateLimit: boolean = false) {
    super(message);
    this.name = 'OMDbApiError';
  }
}

export const omdbApi = {
  async searchMovies(query: string): Promise<MovieSearchResponse> {
    try {
      const response = await fetch(
        `${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new OMDbApiError('Network response was not ok');
      }

      const data: MovieSearchResponse = await response.json();

      if (data.Response === 'False') {
        if (data.Error === 'Request limit reached!') {
          throw new OMDbApiError('API rate limit reached. Please try again later.', true);
        }
        throw new OMDbApiError(data.Error || 'No movies found');
      }

      return data;
    } catch (error) {
      if (error instanceof OMDbApiError) {
        throw error;
      }
      throw new OMDbApiError('Failed to fetch movies. Please check your internet connection.');
    }
  },

  async getMovieDetails(imdbID: string): Promise<MovieDetailsResponse> {
    try {
      const response = await fetch(
        `${OMDB_BASE_URL}?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new OMDbApiError('Network response was not ok');
      }

      const data: MovieDetailsResponse = await response.json();

      if (data.Response === 'False') {
        throw new OMDbApiError(data.Error || 'Failed to fetch movie details');
      }

      return data;
    } catch (error) {
      if (error instanceof OMDbApiError) {
        throw error;
      }
      throw new OMDbApiError('Failed to fetch movie details. Please try again.');
    }
  }
};
