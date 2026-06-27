import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Testimonial } from "../types/testimonial"

export function useTestimonials() {
  return useQuery<{ data: Testimonial[] }>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axios.get("/api/testimonials")
      return data
    },
  })
}
