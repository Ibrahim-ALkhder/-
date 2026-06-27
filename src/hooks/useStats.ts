import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface StatsData {
  propertiesCount: number
  clientsCount: number
  experienceYears: number
  projectsCount: number
}

export function useStats() {
  return useQuery<{ data: StatsData }>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get("/api/stats")
      return data
    },
  })
}
