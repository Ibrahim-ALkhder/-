import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useProjects } from "@/hooks/useProjects"
import { Card } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/utils/formatDate"

export default function Projects() {
  const { t, i18n } = useTranslation()
  useEffect(() => { document.title = t("pages.projects.title") }, [t])
  const { data, isLoading } = useProjects()

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const projects = data?.data || []

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("projects.title")}</h1>
          <p className="text-navy-400 mt-2">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/project/${project.id}`}>
              <Card hover className="cursor-pointer">
                <div className="aspect-[16/9] relative overflow-hidden bg-navy-100">
                  {project.images?.[0] ? (
                    <img src={project.images[0]} alt={i18n.language === "ar" ? project.name : project.nameEn} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-navy-300 text-sm">{t("project.image")}</div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="teal">{t(`project.status.${project.status}`)}</Badge>
                    <span className="text-navy-400 text-xs">{formatDate(project.startDate)}</span>
                  </div>
                  <h3 className="font-bold text-navy-700">
                    {i18n.language === "ar" ? project.name : project.nameEn}
                  </h3>
                  <p className="text-navy-400 text-sm line-clamp-2">
                    {i18n.language === "ar" ? project.description : project.descriptionEn}
                  </p>
                  <div className="flex items-center justify-between text-navy-500 text-xs pt-2 border-t border-navy-100">
                    <span>{i18n.language === "ar" ? project.location : project.locationEn}</span>
                    <span>{project.unitsCount} {t("project.units")}</span>
                  </div>
                </div>
              </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
