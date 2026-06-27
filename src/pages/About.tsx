import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useAgents } from "@/hooks/useAgents"
import { Card } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { Star, Phone, Mail } from "lucide-react"

export default function About() {
  const { t, i18n } = useTranslation()
  useEffect(() => { document.title = t("pages.about.title") }, [t])
  const { data, isLoading } = useAgents()

  const agents = data?.data || []

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("about.title")}</h1>
          <p className="text-navy-400 mt-2 max-w-2xl">{t("about.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div className="aspect-[4/3] rounded-2xl relative overflow-hidden bg-navy-100">
            <img
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800"
              alt={t("about.image")}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-2">
              {t("about.story")}
            </span>
            <h2 className="text-2xl md:text-3xl font-cairo font-bold text-navy-700 mb-4">
              {t("about.storyTitle")}
            </h2>
            <p className="text-navy-500 leading-relaxed mb-4">
              {t("about.storyDesc")}
            </p>
            <p className="text-navy-500 leading-relaxed">
              {t("about.storyDesc2")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-3xl font-cairo font-bold text-navy-700 mb-8 text-center">
            {t("about.team")}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full relative overflow-hidden bg-navy-100 mx-auto mb-4">
                      {agent.photo ? (
                        <img src={agent.photo} alt={i18n.language === "ar" ? agent.name : agent.nameEn} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-navy-400 text-xl font-bold">{agent.name[0]}</div>
                      )}
                    </div>
                    <h3 className="font-bold text-navy-700">{i18n.language === "ar" ? agent.name : agent.nameEn}</h3>
                    <p className="text-navy-400 text-sm mb-2">
                      {i18n.language === "ar" ? agent.specialization : agent.specializationEn}
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          className={j < Math.round(agent.rating) ? "text-gold-500 fill-gold-500" : "text-navy-200"}
                        />
                      ))}
                      <span className="text-navy-400 text-xs mr-1">({agent.rating})</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-navy-400 text-xs">
                      <span>{agent.experience} {t("about.yearsExp")}</span>
                      <span className="w-1 h-1 rounded-full bg-navy-300" />
                      <span>{agent.listingsCount} {t("about.listings")}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <a href={`tel:${agent.phone}`} className="p-2 rounded-full bg-teal-50 text-teal-500 hover:bg-teal-100 transition-colors">
                        <Phone size={16} />
                      </a>
                      <a href={`mailto:${agent.email}`} className="p-2 rounded-full bg-navy-50 text-navy-500 hover:bg-navy-100 transition-colors">
                        <Mail size={16} />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
