import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useTestimonials } from "@/hooks/useTestimonials"

const quoteMark = (
  <svg viewBox="0 0 48 40" className="w-10 h-9 text-gold-300/50" aria-hidden="true">
    <path d="M16.8 0C11.2 0 6.4 2.8 2.4 8.4C0.8 11.2 0 14 0 16.8C0 19.2 0.8 21.6 2.4 24C4 25.6 5.6 26.4 7.2 26.4C9.6 26.4 11.6 25.2 13.2 22.8C14 21.2 14.4 19.6 14.4 18C14.4 16.4 14 15.2 13.2 14.4C12.4 13.6 11.6 13.2 10.8 13.2C10 13.2 9.2 13.6 8.4 14.4C7.6 14.4 7.2 14 7.2 13.2C7.2 11.6 8.4 9.6 10.8 7.2C13.2 4.8 16 3.2 19.2 2.4L16.8 0ZM43.2 0C37.6 0 32.8 2.8 28.8 8.4C27.2 11.2 26.4 14 26.4 16.8C26.4 19.2 27.2 21.6 28.8 24C30.4 25.6 32 26.4 33.6 26.4C36 26.4 38 25.2 39.6 22.8C40.4 21.2 40.8 19.6 40.8 18C40.8 16.4 40.4 15.2 39.6 14.4C38.8 13.6 38 13.2 37.2 13.2C36.4 13.2 35.6 13.6 34.8 14.4C34 14.4 33.6 14 33.6 13.2C33.6 11.6 34.8 9.6 37.2 7.2C39.6 4.8 42.4 3.2 45.6 2.4L43.2 0Z" fill="currentColor"/>
  </svg>
)

const goldLine = (
  <div className="w-16 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mx-auto mt-4" />
)

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const { data } = useTestimonials()
  const testimonials = data?.data || []
  const isAr = i18n.language === "ar"

  if (testimonials.length === 0) return null

  const [feature] = testimonials
  const others = testimonials.slice(1, 5)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-teal-500 text-sm font-semibold tracking-[0.15em] uppercase">
            {t("home.testimonials.section")}
          </span>
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700 mt-3">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-navy-400 mt-2">{t("home.testimonials.subtitle")}</p>
          {goldLine}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="h-full rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100/50 border border-navy-100/80 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-6 -left-6 text-gold-300/20">{quoteMark}</div>
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={15}
                    className={j < feature.rating ? "text-gold-500 fill-gold-500" : "text-navy-200"}
                  />
                ))}
              </div>
              <p className="text-navy-600 text-base md:text-lg leading-[1.8] mb-8">
                {isAr ? feature.content : feature.contentEn}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={feature.avatar}
                  alt={isAr ? feature.name : feature.nameEn}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-300/50"
                />
                <div>
                  <p className="font-bold text-navy-700 text-sm">
                    {isAr ? feature.name : feature.nameEn}
                  </p>
                  <p className="text-navy-400 text-xs">
                    {isAr ? feature.role : feature.roleEn}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {others.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-full rounded-2xl bg-white border border-navy-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j < item.rating ? "text-gold-500 fill-gold-500" : "text-navy-200"}
                      />
                    ))}
                  </div>
                  <p className="text-navy-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {isAr ? item.content : item.contentEn}
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-navy-50">
                    <img
                      src={item.avatar}
                      alt={isAr ? item.name : item.nameEn}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-700 text-xs truncate">
                        {isAr ? item.name : item.nameEn}
                      </p>
                      <p className="text-navy-400 text-[11px] truncate">
                        {isAr ? item.role : item.roleEn}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {testimonials.length > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <button className="px-8 py-3 rounded-full border-2 border-navy-200 text-navy-600 text-sm font-semibold hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50/30 transition-all">
              {t("home.testimonials.viewAll")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
