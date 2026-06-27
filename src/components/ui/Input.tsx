import React from "react"
import { cn } from "@/utils/cn"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, dir, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-navy-700">{label}</label>
        )}
        <input
          ref={ref}
          dir={dir || "auto"}
          className={cn(
            "w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 text-sm",
            "placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500",
            "transition-all duration-300",
            error && "border-red-400 focus:ring-red-500/30 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
