export interface Project {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  completionPercentage: number
  images: string[]
  location: string
  locationEn: string
  unitsCount: number
  developer: string
  startDate: string
  expectedEndDate: string
  status: 'planning' | 'construction' | 'completed'
}
