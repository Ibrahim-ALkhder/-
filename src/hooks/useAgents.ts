import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Agent } from "../types/agent"

export function useAgents() {
  return useQuery<{ data: Agent[] }>({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data } = await axios.get("/api/agents")
      return data
    },
  })
}

export function useAgent(id: string) {
  return useQuery<{ data: Agent }>({
    queryKey: ["agent", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/agents/${id}`)
      return data
    },
    enabled: !!id,
  })
}
