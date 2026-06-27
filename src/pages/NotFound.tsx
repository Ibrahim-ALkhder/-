import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  useEffect(() => { document.title = t("pages.notFound.title") }, [t])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6"
      >
        <h1 className="text-8xl md:text-[10rem] font-cairo font-bold text-navy-100 leading-none mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-cairo font-bold text-navy-700 mb-2">{t("notFound.title")}</h2>
        <p className="text-navy-400 mb-8 max-w-md mx-auto">{t("notFound.description")}</p>
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-navy-500 text-white font-medium text-sm hover:bg-navy-600 transition-colors"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("notFound.cta")}
        </button>
      </motion.div>
    </div>
  )
}
