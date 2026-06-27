import React from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "teal" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
}

const variants = {
  primary: "bg-navy-500 text-white hover:bg-navy-600",
  teal: "bg-teal-500 text-white hover:bg-teal-600",
  outline: "border-2 border-navy-500 text-navy-500 hover:bg-navy-50",
  ghost: "text-navy-500 hover:bg-navy-50",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group rounded-full font-jakarta font-medium transition-all duration-700 ease-premium active:scale-[0.98] inline-flex items-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {icon && (
        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 transition-transform duration-500">
          {icon}
        </span>
      )}
    </button>
  )
}
