import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SearchBar from "./SearchBar"

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[128px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-teal-300 text-sm font-medium mb-6"
        >
          {t("home.hero.tagline")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-cairo font-bold text-white leading-tight mb-6"
        >
          {t("home.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-navy-200 max-w-2xl mx-auto mb-10"
        >
          {t("home.hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  )
}
