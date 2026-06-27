import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Project } from "../types/project"

export function useProjects() {
  return useQuery<{ data: Project[] }>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axios.get("/api/projects")
      return data
    },
  })
}
