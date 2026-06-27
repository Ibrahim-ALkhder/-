import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phone = "966550000000"
  const message = "مرحباً، أود الاستفسار عن عقاراتكم"

  return (
    <AnimatePresence>
      <motion.a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-8 right-6 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="relative flex">
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
          <span className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg text-white">
            <MessageCircle size={28} />
          </span>
        </span>
      </motion.a>
    </AnimatePresence>
  )
}
