import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, Building2, ClipboardCheck, Scale, TrendingUp, Megaphone, Headphones } from "lucide-react"

const services = [
  { key: "buySell", icon: Building2 },
  { key: "management", icon: ClipboardCheck },
  { key: "valuation", icon: Scale },
  { key: "consulting", icon: TrendingUp },
  { key: "marketing", icon: Megaphone },
  { key: "support", icon: Headphones },
]

export default function Services() {
  const { t } = useTranslation()
  useEffect(() => { document.title = t("pages.services.title") }, [t])

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("services.title")}</h1>
          <p className="text-navy-400 mt-2 max-w-xl mx-auto">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-2xl border border-navy-100 bg-white hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-500 transition-colors duration-500">
                  <Icon size={28} className="text-teal-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 mb-3">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed mb-4">
                  {t(`services.items.${service.key}.desc`)}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-teal-500 text-sm font-medium hover:text-teal-600 transition-colors"
                >
                  {t("services.learnMore")}
                  <ArrowLeft size={14} className="rtl:rotate-180" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
