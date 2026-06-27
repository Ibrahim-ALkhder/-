import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function CTASection() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-6 lg:mx-auto rounded-3xl bg-gradient-to-br from-navy-800 via-navy-700 to-teal-600 p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-400 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-cairo font-bold text-white mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-navy-200 text-lg max-w-lg mx-auto mb-8">
            {t("home.cta.subtitle")}
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-navy-700 font-bold text-sm hover:bg-gold-50 transition-colors"
          >
            {t("home.cta.button")}
            <span className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
              <ArrowLeft
                size={16}
                className="text-white rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
