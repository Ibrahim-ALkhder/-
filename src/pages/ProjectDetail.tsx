import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { MapPin, Building, Calendar, Users, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { useProject } from "@/hooks/useProject"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Button } from "@/components/ui/Button"

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const { data: response, isLoading } = useProject(id || "")
  useEffect(() => {
    if (response?.data) {
      document.title = `${i18n.language === "ar" ? response.data.name : response.data.nameEn} | ${t("pages.home.title")}`
    } else {
      document.title = t("pages.projectDetail.title")
    }
  }, [response, i18n.language, t])

  const project = response?.data
  const images = project?.images?.length ? project.images.slice(0, 4) : []
  const [activeImage, setActiveImage] = useState(0)

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Skeleton className="h-[400px] rounded-2xl mb-8" />
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-700 mb-2">{t("project.detail.notFound")}</h2>
          <button onClick={() => navigate("/projects")} className="text-teal-500 hover:underline">
            {t("project.detail.backToProjects")}
          </button>
        </div>
      </div>
    )
  }

  const statusColor = {
    planning: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
    construction: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    completed: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  }[project.status]

  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-navy-400 hover:text-navy-600 transition-colors mb-6 text-sm"
          >
            <ChevronLeft size={16} className="rtl:rotate-180" />
            {t("common.back")}
          </button>
        </motion.div>

        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg group">
            {images.length > 0 ? (
              <div className="aspect-[16/9] md:aspect-[2.5/1] max-h-[300px] md:max-h-[400px] relative bg-navy-100">
                <img
                  src={images[activeImage]}
                  alt=""
                  className="w-full h-full object-cover"
                  key={activeImage}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                      aria-label="Previous image"
                    >
                      <ChevronRight size={18} className="rtl:rotate-180 text-navy-700" />
                    </button>
                    <button
                      onClick={() => setActiveImage((activeImage + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} className="rotate-180 rtl:rotate-0 text-navy-700" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="aspect-[16/9] md:aspect-[2.5/1] max-h-[300px] md:max-h-[400px] bg-navy-100 flex items-center justify-center text-navy-300">
                {t("project.image")}
              </div>
            )}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                {t(`project.status.${project.status}`)}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 z-10 text-xs text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              {activeImage + 1} / {images.length}
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeImage ? "border-teal-500 opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-cairo font-bold text-navy-700 leading-tight">
                    {i18n.language === "ar" ? project.name : project.nameEn}
                  </h1>
                  <div className="flex items-center gap-2 text-navy-400 text-sm mt-2">
                    <MapPin size={15} />
                    <span>{i18n.language === "ar" ? project.location : project.locationEn}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-white border border-navy-100 mb-8">
                <div className="flex flex-col items-center gap-1.5">
                  <Building size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{project.developer}</span>
                  <span className="text-navy-400 text-xs">{t("project.detail.developer")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Calendar size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{project.startDate}</span>
                  <span className="text-navy-400 text-xs">{t("project.detail.startDate")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Users size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{project.unitsCount}</span>
                  <span className="text-navy-400 text-xs">{t("project.detail.units")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <CheckCircle2 size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{project.completionPercentage}%</span>
                  <span className="text-navy-400 text-xs">{t("project.detail.completionPercentage")}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-700 mb-3">{t("project.detail.overview")}</h2>
                <p className="text-navy-500 leading-relaxed text-sm md:text-base">
                  {i18n.language === "ar" ? project.description : project.descriptionEn}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 sticky top-28 self-start"
          >
            <div className="p-6 rounded-2xl border border-navy-100 bg-white shadow-sm">
              <h3 className="text-lg font-bold text-navy-700 mb-4">{t("project.detail.overview")}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.location")}</span>
                  <span className="text-navy-700 text-sm font-medium text-right">
                    {i18n.language === "ar" ? project.location : project.locationEn}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.developer")}</span>
                  <span className="text-navy-700 text-sm font-medium text-right">{project.developer}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.startDate")}</span>
                  <span className="text-navy-700 text-sm font-medium">{project.startDate}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.expectedEndDate")}</span>
                  <span className="text-navy-700 text-sm font-medium">{project.expectedEndDate}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.units")}</span>
                  <span className="text-navy-700 text-sm font-medium">{project.unitsCount}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                  <span className="text-navy-400 text-sm">{t("project.detail.completionPercentage")}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-navy-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-500 transition-all"
                        style={{ width: `${project.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-navy-700 text-sm font-medium">{project.completionPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/projects">
              <Button variant="outline" className="w-full justify-center">
                {t("project.detail.backToProjects")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
