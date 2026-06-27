import { create } from "zustand"

interface FavoritesStore {
  items: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorited: (id: string) => boolean
}

const stored = typeof window !== "undefined" ? localStorage.getItem("favorites") : null
const initial: string[] = stored ? JSON.parse(stored) : []

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  items: initial,
  addFavorite: (id) => {
    const items = [...get().items, id]
    set({ items })
    localStorage.setItem("favorites", JSON.stringify(items))
  },
  removeFavorite: (id) => {
    const items = get().items.filter((i) => i !== id)
    set({ items })
    localStorage.setItem("favorites", JSON.stringify(items))
  },
  isFavorited: (id) => get().items.includes(id),
}))

export function useFavorites() {
  const items = useFavoritesStore((s) => s.items)
  const addFavorite = useFavoritesStore((s) => s.addFavorite)
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite)
  const isFavorited = useFavoritesStore((s) => s.isFavorited)
  return { items, addFavorite, removeFavorite, isFavorited }
}
