import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const partners = [
  "شركة الرياض العقارية",
  "دار التمليك",
  "مؤسسة البناء المتطور",
  "شركة الخليج للاستثمار",
  "بيوت الخير العقارية",
  "شركة الريادة للتطوير",
  "أبراج المملكة",
  "شركة الصفوة العقارية",
]

export default function Partners() {
  const { t } = useTranslation()

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-cairo font-bold text-navy-700">
            {t("home.partners.title")}
          </h2>
          <p className="text-navy-400 mt-2">{t("home.partners.subtitle")}</p>
        </motion.div>

        <div className="overflow-hidden mask-edges">
          <div className="flex gap-8 animate-marquee" style={{ width: "fit-content" }}>
            {[...partners, ...partners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="shrink-0 px-8 py-4 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center min-w-[180px]"
              >
                <span className="font-cairo font-bold text-navy-400 text-sm whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
