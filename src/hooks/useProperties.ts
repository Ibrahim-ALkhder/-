import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Property, PropertyFilter } from "../types/property"
import type { PaginatedResponse } from "../types/common"

export function useProperties(filters: PropertyFilter) {
  const params = new URLSearchParams()
  if (filters.city?.length) filters.city.forEach((c) => params.append("city", c))
  if (filters.type?.length) filters.type.forEach((t) => params.append("type", t))
  if (filters.status) params.set("status", filters.status)
  if (filters.priceMin) params.set("priceMin", String(filters.priceMin))
  if (filters.priceMax) params.set("priceMax", String(filters.priceMax))
  if (filters.bedrooms?.length) filters.bedrooms.forEach((b) => params.append("bedrooms", String(b)))
  if (filters.sortBy) params.set("sortBy", filters.sortBy)
  params.set("page", String(filters.page || 1))
  params.set("limit", String(filters.limit || 12))

  return useQuery<PaginatedResponse<Property>>({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const { data } = await axios.get(`/api/properties?${params}`)
      return data
    },
  })
}

export function useProperty(id: string) {
  return useQuery<{ data: Property }>({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/properties/${id}`)
      return data
    },
    enabled: !!id,
  })
}
