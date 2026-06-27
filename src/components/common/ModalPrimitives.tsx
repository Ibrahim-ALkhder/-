import { cn } from "@/utils/cn"

interface DialogOverlayProps {
  children: React.ReactNode
  className?: string
}

export function DialogOverlay({ children, className }: DialogOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // overlay click handled by parent
        }
      }}
    >
      {children}
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-navy-100",
        className
      )}
    >
      {children}
    </div>
  )
}
