export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'agent' | 'client'
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
