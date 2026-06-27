import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/utils/cn"

interface FavoriteButtonProps {
  propertyId: string
  className?: string
}

export default function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const stored = localStorage.getItem("favorites")
    if (!stored) return false
    try {
      const ids: string[] = JSON.parse(stored)
      return ids.includes(propertyId)
    } catch {
      return false
    }
  })

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const stored = localStorage.getItem("favorites")
    let ids: string[] = []
    try {
      ids = stored ? JSON.parse(stored) : []
    } catch {
      ids = []
    }
    if (ids.includes(propertyId)) {
      ids = ids.filter((id) => id !== propertyId)
    } else {
      ids.push(propertyId)
    }
    localStorage.setItem("favorites", JSON.stringify(ids))
    setIsFavorite(!isFavorite)
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm",
        isFavorite
          ? "bg-red-500 text-white shadow-md"
          : "bg-white/80 text-navy-400 hover:bg-white",
        className
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  )
}
