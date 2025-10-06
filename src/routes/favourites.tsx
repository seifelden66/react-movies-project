import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useFavouritesAll } from '@/stores/favourites'
import { MovieGrid } from '@/components/organisms/MovieGrid'
import type { Movie } from '@/types/movie'
import { Text } from '@/components/atoms/Text'

export const Route = createFileRoute('/favourites')({
  component: FavouritesPage,
})

function FavouritesPage() {
  useEffect(() => {
    document.title = "Your Favourites – Seif's Movies"
  }, [])

  const navigate = useNavigate()
  const favourites = useFavouritesAll()

  const handleMovieClick = (movie: Movie) => {
    navigate({ to: '/movie/$id', params: { id: movie.imdbID } })
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <Text variant="h2" className="text-center">Your Favourites</Text>
        <Text variant="caption" className="text-center block mt-2">
          {favourites.length === 0 ? 'No favourites yet. Tap the heart on a movie to save it.' : 'Movies you have saved.'}
        </Text>
      </div>
      {favourites.length > 0 && (
        <MovieGrid movies={favourites} onMovieClick={handleMovieClick} />
      )}
    </div>
  )
}

