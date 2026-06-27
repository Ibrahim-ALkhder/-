import type { City, PropertyType, PropertyStatus, Condition, NearbyService } from './common'

export interface Property {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  price: number
  area: number
  city: City
  neighborhood: string
  neighborhoodEn: string
  type: PropertyType
  status: PropertyStatus
  bedrooms: number
  bathrooms: number
  floor?: number
  year: number
  condition: Condition
  images: string[]
  features: string[]
  featuresEn: string[]
  coordinates: [number, number]
  nearbyServices: NearbyService[]
  agentId: string
  isFeatured: boolean
  createdAt: string
}

export interface PropertyFilter {
  city?: City[]
  type?: PropertyType[]
  status?: PropertyStatus
  priceMin?: number
  priceMax?: number
  areaMin?: number
  areaMax?: number
  bedrooms?: number[]
  bathrooms?: number[]
  condition?: Condition[]
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'area'
  page?: number
  limit?: number
}
