import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface BlogPost {
  id: string
  titleAr: string
  titleEn: string
  excerptAr: string
  excerptEn: string
  contentAr: string
  contentEn: string
  categoryAr: string
  categoryEn: string
  author: string
  date: string
  readTime: number
  image: string
  tags: string[]
}

export function useBlogPosts() {
  return useQuery<{ data: BlogPost[] }>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const { data } = await axios.get("/api/blog")
      return data
    },
  })
}

export function useBlogPost(id: string) {
  return useQuery<{ data: BlogPost }>({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/blog/${id}`)
      return data
    },
    enabled: !!id,
  })
}
