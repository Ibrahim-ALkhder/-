import { cn } from "@/utils/cn"

interface BadgeProps {
  variant?: "teal" | "gold" | "navy" | "outline"
  children: React.ReactNode
  className?: string
}

const variants = {
  teal: "bg-teal-500/10 text-teal-600 border-teal-200",
  gold: "bg-gold-500/10 text-gold-600 border-gold-200",
  navy: "bg-navy-500/10 text-navy-600 border-navy-200",
  outline: "bg-white text-navy-500 border-navy-200",
}

export function Badge({ variant = "teal", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
