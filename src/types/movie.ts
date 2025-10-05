export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  imdbRating?: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
  Error?: string;
}