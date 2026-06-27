import { create } from "zustand"

interface UIStore {
  isMobileMenuOpen: boolean
  isFilterOpen: boolean
  activeModal: string | null
  toggleMobileMenu: () => void
  openFilter: () => void
  closeFilter: () => void
  openModal: (id: string) => void
  closeModal: () => void
  closeAll: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isFilterOpen: false,
  activeModal: null,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  closeAll: () => set({ isMobileMenuOpen: false, isFilterOpen: false, activeModal: null }),
}))
