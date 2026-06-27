import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Project } from "../types/project"

export function useProject(id: string) {
  return useQuery<{ data: Project }>({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/projects/${id}`)
      return data
    },
    enabled: !!id,
  })
}
