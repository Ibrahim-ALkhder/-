import { useEffect, useContext } from "react"
import { DialogOverlay, DialogContent } from "./ModalPrimitives"
import { motion } from "framer-motion"
import { X, Share2, MessageCircle, Twitter, Link, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { cn } from "@/utils/cn"

interface ShareModalProps {
  open: boolean
  onClose: () => void
  url?: string
  title?: string
}

export default function ShareModal({ open, onClose, url, title }: ShareModalProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareTitle = title || ""

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }

  return open ? (
    <DialogOverlay>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogContent>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-navy-50 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
              <Share2 size={20} className="text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-navy-700">
              {t("property.share")}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <MessageCircle size={28} className="text-green-600" />
              <span className="text-xs font-medium text-navy-600">WhatsApp</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Twitter size={28} className="text-blue-500" />
              <span className="text-xs font-medium text-navy-600">Twitter</span>
            </a>
            <button
              onClick={copyLink}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-colors",
                copied ? "bg-teal-50" : "bg-navy-50 hover:bg-navy-100"
              )}
            >
              {copied ? (
                <Check size={28} className="text-teal-500" />
              ) : (
                <Link size={28} className="text-navy-500" />
              )}
              <span className="text-xs font-medium text-navy-600">
                {copied ? t("common.copied") : t("common.copyLink")}
              </span>
            </button>
          </div>
        </DialogContent>
      </motion.div>
    </DialogOverlay>
  ) : null
}
