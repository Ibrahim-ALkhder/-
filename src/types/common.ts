export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface SortOption {
  label: string
  value: string
}

export type City = 'riyadh' | 'jeddah' | 'mecca' | 'medina' | 'dammam'
export type PropertyType = 'villa' | 'apartment' | 'commercial' | 'land' | 'warehouse'
export type PropertyStatus = 'for-sale' | 'for-rent'
export type Condition = 'new' | 'used' | 'under-construction'

export interface NearbyService {
  id: string
  name: string
  nameEn: string
  icon: string
  distance: number
  category: 'mosque' | 'school' | 'hospital' | 'mall' | 'park' | 'restaurant'
}
