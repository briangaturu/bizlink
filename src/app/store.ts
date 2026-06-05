import { create } from 'zustand'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  bio?: string
  location?: string
  role: 'buyer' | 'seller' | 'admin'
  verified: boolean
  followers: number
  ratings: number
  createdAt: string
}

interface AuthState {
  token: string | null
  user: User | null
  userRole: 'buyer' | 'seller' | 'admin' | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>((set: any) => {
  const savedToken = localStorage.getItem('auth_token')
  const savedUser = localStorage.getItem('auth_user')

  return {
    token: savedToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
    userRole: savedUser ? JSON.parse(savedUser).role : null,
    isLoading: false,
    error: null,

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
        set({ token: data.token, user: data.user, userRole: data.user.role })
      } catch (error) {
        set({ error: (error as Error).message })
        throw error
      } finally {
        set({ isLoading: false })
      }
    },

    register: async (data: any) => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const result = await response.json()
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('auth_user', JSON.stringify(result.user))
        set({ token: result.token, user: result.user, userRole: result.user.role })
      } catch (error) {
        set({ error: (error as Error).message })
        throw error
      } finally {
        set({ isLoading: false })
      }
    },

    logout: () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      set({ token: null, user: null, userRole: null })
    },

    setUser: (user: User) => {
      localStorage.setItem('auth_user', JSON.stringify(user))
      set({ user, userRole: user.role })
    },

    setToken: (token: string) => {
      localStorage.setItem('auth_token', token)
      set({ token })
    },
  }
})

