import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Building2, ClipboardCheck, Scale, TrendingUp, Megaphone, Headphones } from "lucide-react"

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

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-teal-500 text-sm font-semibold tracking-widest uppercase">
            {t("home.services.section")}
          </span>
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700 mt-2">
            {t("home.services.title")}
          </h2>
          <p className="text-navy-400 mt-2 max-w-xl mx-auto">{t("home.services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors duration-500">
                  <Icon size={24} className="text-teal-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-700 mb-2">
                  {t(`home.services.items.${service.key}.title`)}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed">
                  {t(`home.services.items.${service.key}.desc`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
