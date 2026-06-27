import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { DialogOverlay, DialogContent } from "./ModalPrimitives"
import { X, Download } from "lucide-react"
import { useTranslation } from "react-i18next"
import { QRCodeSVG } from "qrcode.react"

interface QRModalProps {
  open: boolean
  onClose: () => void
  url?: string
  title?: string
}

export default function QRModal({ open, onClose, url, title }: QRModalProps) {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLDivElement>(null)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

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

  const downloadQR = () => {
    const svg = canvasRef.current?.querySelector("svg")
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const blob = new Blob([svgStr], { type: "image/svg+xml" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `qrcode-${Date.now()}.svg`
    a.click()
    URL.revokeObjectURL(a.href)
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
          <h2 className="text-xl font-bold text-navy-700 mb-4 text-center">
            {title || t("property.qrCode")}
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div ref={canvasRef} className="p-4 bg-white rounded-xl border border-navy-100">
              {shareUrl && <QRCodeSVG value={shareUrl} size={180} level="M" />}
            </div>
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-navy-500 text-white hover:bg-navy-600 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              {t("common.download")}
            </button>
          </div>
        </DialogContent>
      </motion.div>
    </DialogOverlay>
  ) : null
}
