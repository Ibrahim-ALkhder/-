import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useProperties } from "@/hooks/useProperties"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import FavoriteButton from "@/components/common/FavoriteButton"
import { formatPrice } from "@/utils/formatPrice"
import { formatArea } from "@/utils/formatArea"

export default function FeaturedProperties() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { data, isLoading } = useProperties({ limit: 6, sortBy: "newest" })

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const properties = data?.data || []

  return (
    <section className="py-24 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-teal-500 text-sm font-semibold tracking-widest uppercase">
              {t("home.featured.section")}
            </span>
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700 mt-2">
              {t("home.featured.title")}
            </h2>
            <p className="text-navy-400 mt-2">{t("home.featured.subtitle")}</p>
          </div>
          <button
            onClick={() => navigate("/properties")}
            className="px-6 py-3 rounded-full border-2 border-navy-200 text-navy-600 font-medium text-sm hover:border-teal-400 hover:text-teal-500 transition-colors"
          >
            {t("home.featured.viewAll")}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card hover className="cursor-pointer group" onClick={() => navigate(`/property/${property.id}`)}>
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="aspect-[4/3] relative overflow-hidden bg-navy-100">
                    {property.images?.[0] ? (
                      <img src={property.images[0]} alt={i18n.language === "ar" ? property.title : property.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-300 text-sm">{t("property.image")}</div>
                    )}
                  </div>
                  <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={property.status === "for-sale" ? "teal" : "gold"}>
                      {t(`property.status.${property.status}`)}
                    </Badge>
                  </div>
                  {property.isFeatured && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="gold">{t("property.featured")}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-navy-700 group-hover:text-teal-500 transition-colors line-clamp-1">
                      {i18n.language === "ar" ? property.title : property.titleEn}
                    </h3>
                    <span className="text-gold-600 font-bold text-sm whitespace-nowrap shrink-0">
                      {formatPrice(property.price, i18n.language as "ar" | "en")}
                    </span>
                  </div>
                  <p className="text-navy-400 text-sm line-clamp-1">
                    {i18n.language === "ar" ? property.neighborhood : property.neighborhoodEn}
                  </p>
                  <div className="flex items-center gap-4 text-navy-500 text-xs">
                    <span>{property.bedrooms} {t("property.beds")}</span>
                    <span className="w-1 h-1 rounded-full bg-navy-300" />
                    <span>{property.bathrooms} {t("property.baths")}</span>
                    <span className="w-1 h-1 rounded-full bg-navy-300" />
                    <span>{formatArea(property.area)}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
