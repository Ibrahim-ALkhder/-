import { create } from "zustand"
import type { User } from "../types/user"

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {
    try {
      const res = await fetch("/api/auth/login", { method: "POST" })
      const data = await res.json()
      set({ user: data.user, token: data.token, isAuthenticated: true })
    } catch {
      set({ user: null, token: null, isAuthenticated: false })
    }
  },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}))
