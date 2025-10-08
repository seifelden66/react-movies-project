import { Store } from '@tanstack/store'
import { useStore } from '@tanstack/react-store'
import type { Movie } from '@/types/movie'

export interface FavouritesState {
  itemsById: Record<string, Movie>
}

const STORAGE_KEY = 'movie-favourites'

const loadInitialState = (): FavouritesState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { itemsById: parsed.itemsById || {} }
    }
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error)
  }
  return { itemsById: {} }
}

const saveToStorage = (state: FavouritesState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save favourites to localStorage:', error)
  }
}

const initialState: FavouritesState = loadInitialState()

export const favouritesStore = new Store<FavouritesState>(initialState)

favouritesStore.subscribe(() => {
  saveToStorage(favouritesStore.state)
})

export const favouritesSelectors = {
  selectAll: (state: FavouritesState) => Object.values(state.itemsById),
  selectCount: (state: FavouritesState) => Object.keys(state.itemsById).length,
  selectHas: (id: string) => (state: FavouritesState) => Boolean(state.itemsById[id]),
}

export const favouritesActions = {
  add(movie: Movie) {
    favouritesStore.setState(prev => ({
      ...prev,
      itemsById: {
        ...prev.itemsById,
        [movie.imdbID]: movie,
      },
    }))
  },
  remove(imdbID: string) {
    favouritesStore.setState(prev => {
      const next = { ...prev.itemsById }
      delete next[imdbID]
      return { ...prev, itemsById: next }
    })
  },
  toggle(movie: Movie) {
    const isFav = favouritesSelectors.selectHas(movie.imdbID)(favouritesStore.state)
    if (isFav) {
      this.remove(movie.imdbID)
    } else {
      this.add(movie)
    }
  },
  clear() {
    favouritesStore.setState(prev => ({ ...prev, itemsById: {} }))
  },
}

export function useFavouritesAll() {
  return useStore(favouritesStore, favouritesSelectors.selectAll)
}

export function useFavouritesCount() {
  return useStore(favouritesStore, favouritesSelectors.selectCount)
}

export function useIsFavourite(imdbID: string) {
  return useStore(favouritesStore, favouritesSelectors.selectHas(imdbID))
}