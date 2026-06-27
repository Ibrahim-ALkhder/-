import { cn } from "@/utils/cn"
import type { KeyboardEvent } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false, onClick, onKeyDown, ...props }: CardProps) {
  const interactive = typeof onClick === "function"

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick!(e as unknown as React.MouseEvent<HTMLDivElement>)
    }
    onKeyDown?.(e)
  }

  return (
    <div
      className={cn(
        "p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 dark:bg-white/5 transition-all duration-700 ease-premium",
        hover && "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,196,204,0.2)]",
        interactive && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <div className="rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
        {children}
      </div>
    </div>
  )
}
