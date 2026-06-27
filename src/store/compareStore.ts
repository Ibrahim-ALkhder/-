import { create } from "zustand"
import type { Property } from "../types/property"

interface CompareStore {
  items: Property[]
  addItem: (property: Property) => void
  removeItem: (id: string) => void
  clearAll: () => void
  isInCompare: (id: string) => boolean
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],
  addItem: (property) => {
    const { items } = get()
    if (items.length >= 4) return
    if (items.find((i) => i.id === property.id)) return
    set({ items: [...items, property] })
  },
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clearAll: () => set({ items: [] }),
  isInCompare: (id) => get().items.some((i) => i.id === id),
}))
