import React from "react"
import { cn } from "@/utils/cn"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-navy-700">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 text-sm appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500",
            "transition-all duration-300",
            error && "border-red-400",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Select.displayName = "Select"
