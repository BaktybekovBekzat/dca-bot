import type { ID } from '@/lib/types'

export interface IAuthState {
  isLoading: boolean
  user: null | IUser
}

export interface IRegisterForm {
  fullname: string
  email: string
  password: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IUser {
  id: ID
  email: string
  fullname: string
}
