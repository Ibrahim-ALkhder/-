import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { MapPin, Bed, Bath, Maximize, Calendar, ChevronLeft, Share2, QrCode, Phone, Mail, ChevronRight } from "lucide-react"
import { useProperty, useProperties } from "@/hooks/useProperties"
import { useAgents } from "@/hooks/useAgents"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Button } from "@/components/ui/Button"
import FavoriteButton from "@/components/common/FavoriteButton"
import ShareModal from "@/components/common/ShareModal"
import QRModal from "@/components/common/QRModal"
import PropertyCard from "@/components/properties/PropertyCard"
import { formatPrice } from "@/utils/formatPrice"
import { formatArea } from "@/utils/formatArea"
import { formatDate } from "@/utils/formatDate"

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [shareOpen, setShareOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  const { data: response, isLoading } = useProperty(id || "")
  const { data: agentsData } = useAgents()
  const [activeImage, setActiveImage] = useState(0)
  useEffect(() => {
    if (response?.data) {
      document.title = `${i18n.language === "ar" ? response.data.title : response.data.titleEn} | ${t("pages.home.title")}`
    } else {
      document.title = t("pages.propertyDetail.title")
    }
  }, [response, i18n.language, t])
  const property = response?.data
  const { data: similarData } = useProperties({ limit: 4, sortBy: "newest" })

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

  if (!property) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-700 mb-2">{t("property.notFound")}</h2>
          <button onClick={() => navigate("/properties")} className="text-teal-500 hover:underline">
            {t("property.backToProperties")}
          </button>
        </div>
      </div>
    )
  }

  const agents = agentsData?.data || []
  const agentIndex = property.id.charCodeAt(0) % Math.max(agents.length, 1)
  const agent = agents[agentIndex] || null
  const similar = similarData?.data?.filter((p) => p.id !== property.id).slice(0, 3) || []
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const images = property.images?.length ? property.images.slice(0, 4) : []

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
              <div className="aspect-[16/9] md:aspect-[2.5/1] max-h-[180px] md:max-h-[280px] lg:max-h-[320px] relative bg-navy-100">
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
              <div className="aspect-[16/9] md:aspect-[2.5/1] max-h-[180px] md:max-h-[280px] lg:max-h-[320px] bg-navy-100 flex items-center justify-center text-navy-300">
                {t("property.noImages")}
              </div>
            )}
            <FavoriteButton propertyId={property.id} className="absolute top-3 right-3 z-10" />
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <Badge variant={property.status === "for-sale" ? "teal" : "gold"}>
                {t(`property.status.${property.status}`)}
              </Badge>
              {property.isFeatured && <Badge variant="gold">{t("property.featured")}</Badge>}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-cairo font-bold text-navy-700 leading-tight">
                    {i18n.language === "ar" ? property.title : property.titleEn}
                  </h1>
                  <div className="flex items-center gap-2 text-navy-400 text-sm mt-2">
                    <MapPin size={15} />
                    <span>{i18n.language === "ar" ? property.neighborhood : property.neighborhoodEn}</span>
                    <span className="mx-1">-</span>
                    <span className="capitalize">{property.city}</span>
                  </div>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-gold-600 whitespace-nowrap shrink-0">
                  {formatPrice(property.price, i18n.language as "ar" | "en")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-white border border-navy-100 mb-8">
                <div className="flex flex-col items-center gap-1.5">
                  <Bed size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{property.bedrooms}</span>
                  <span className="text-navy-400 text-xs">{t("property.beds")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Bath size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{property.bathrooms}</span>
                  <span className="text-navy-400 text-xs">{t("property.baths")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Maximize size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{formatArea(property.area)}</span>
                  <span className="text-navy-400 text-xs">{t("property.area")}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Calendar size={20} className="text-teal-500" />
                  <span className="text-navy-700 font-semibold text-sm">{formatDate(property.createdAt)}</span>
                  <span className="text-navy-400 text-xs">{t("property.year")}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-700 mb-3">{t("property.description")}</h2>
                <p className="text-navy-500 leading-relaxed text-sm md:text-base">
                  {i18n.language === "ar" ? property.description : property.descriptionEn}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-700 mb-3">{t("property.features")}</h2>
                <div className="flex flex-wrap gap-2">
                  {(i18n.language === "ar" ? property.features : property.featuresEn).map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm border border-teal-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-navy-200 text-navy-600 text-sm hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <Share2 size={16} />
                  {t("property.share")}
                </button>
                <button
                  onClick={() => setQrOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-navy-200 text-navy-600 text-sm hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <QrCode size={16} />
                  {t("property.qrCode")}
                </button>
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
              <h3 className="text-lg font-bold text-navy-700 mb-4">{t("property.booking")}</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder={t("property.bookingForm.name")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none focus:border-teal-400 transition-colors bg-navy-50/30"
                />
                <input
                  type="tel"
                  placeholder={t("property.bookingForm.phone")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none focus:border-teal-400 transition-colors bg-navy-50/30"
                />
                <input
                  type="email"
                  placeholder={t("property.bookingForm.email")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none focus:border-teal-400 transition-colors bg-navy-50/30"
                />
                <textarea
                  placeholder={t("property.bookingForm.message")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none focus:border-teal-400 transition-colors resize-none bg-navy-50/30"
                />
                <Button className="w-full justify-center">
                  {t("property.bookingForm.submit")}
                </Button>
              </form>
            </div>

            {agent && (
              <div className="p-6 rounded-2xl border border-navy-100 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-navy-700 mb-4">{t("property.agent")}</h3>
                <div className="flex items-center gap-3 mb-4">
                  {agent.photo ? (
                    <img src={agent.photo} alt={i18n.language === "ar" ? agent.name : agent.nameEn} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-400 font-bold shrink-0 text-lg">
                      {(agent.name || "A")[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-navy-700 text-sm truncate">
                      {i18n.language === "ar" ? agent.name : agent.nameEn}
                    </p>
                    <p className="text-navy-400 text-xs truncate">
                      {i18n.language === "ar" ? agent.specialization : agent.specializationEn}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-50 text-teal-600 text-sm font-medium hover:bg-teal-100 transition-colors"
                    >
                      <Phone size={16} />
                      <span dir="ltr">{agent.phone}</span>
                    </a>
                  )}
                  {agent.email && (
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-50 text-navy-600 text-sm font-medium hover:bg-navy-100 transition-colors"
                    >
                      <Mail size={16} />
                      <span className="truncate">{agent.email}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {similar.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-cairo font-bold text-navy-700 mb-8">{t("property.similar")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} url={currentUrl} title={i18n.language === "ar" ? property.title : property.titleEn} />
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} url={currentUrl} />
    </div>
  )
}
