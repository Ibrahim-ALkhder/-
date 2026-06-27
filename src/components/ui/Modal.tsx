import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const prevFocus = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    prevFocus.current = document.activeElement as HTMLElement
    document.body.style.overflow = "hidden"

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab" || !modalRef.current) return

      const el = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      const first = el[0]
      const last = el[el.length - 1]

      if (!first) return

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", trap)

    requestAnimationFrame(() => {
      const el = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (el?.length) el[0].focus()
    })

    return () => {
      document.removeEventListener("keydown", trap)
      document.body.style.overflow = ""
      prevFocus.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h2 className="text-xl font-bold text-navy-900">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-navy-50 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
