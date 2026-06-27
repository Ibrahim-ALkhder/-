import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import FavoriteButton from "@/components/common/FavoriteButton"
import { formatPrice } from "@/utils/formatPrice"
import { formatArea } from "@/utils/formatArea"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  property: Property
  variant?: "grid" | "list"
}

export default function PropertyCard({ property, variant = "grid" }: PropertyCardProps) {
  const { t, i18n } = useTranslation()

  if (variant === "list") {
    return (
      <Card hover className="flex flex-col md:flex-row overflow-hidden">
        <Link to={`/property/${property.id}`} className="flex flex-col md:flex-row w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset rounded-[calc(2rem-0.375rem)]">
          <div className="relative w-full md:w-72 shrink-0">
            <div className="aspect-[16/10] md:aspect-[4/3] relative overflow-hidden bg-navy-100">
              {property.images?.[0] ? (
                <img src={property.images[0]} alt={i18n.language === "ar" ? property.title : property.titleEn} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-navy-300 text-sm">{t("property.image")}</div>
              )}
            </div>
            <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" aria-label={t("common.toggleFavorite")} />
            <div className="absolute top-3 left-3">
              <Badge variant={property.status === "for-sale" ? "teal" : "gold"}>
                {t(`property.status.${property.status}`)}
              </Badge>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-navy-700">
                  {i18n.language === "ar" ? property.title : property.titleEn}
                </h3>
                <span className="text-gold-600 font-bold whitespace-nowrap">{formatPrice(property.price, i18n.language as "ar" | "en")}</span>
              </div>
              <p className="text-navy-400 text-sm mb-3">
                {i18n.language === "ar" ? property.neighborhood : property.neighborhoodEn}
              </p>
              <p className="text-navy-500 text-sm line-clamp-2">
                {i18n.language === "ar" ? property.description : property.descriptionEn}
              </p>
            </div>
            <div className="flex items-center gap-4 text-navy-500 text-xs mt-4">
              <span>{property.bedrooms} {t("property.beds")}</span>
              <span className="w-1 h-1 rounded-full bg-navy-300" />
              <span>{property.bathrooms} {t("property.baths")}</span>
              <span className="w-1 h-1 rounded-full bg-navy-300" />
              <span>{formatArea(property.area)}</span>
              <span className="w-1 h-1 rounded-full bg-navy-300" />
              <span>{property.city}</span>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card hover className="group">
      <Link to={`/property/${property.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset rounded-[calc(2rem-0.375rem)]">
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-[16/10] relative overflow-hidden bg-navy-100">
          {property.images?.[0] ? (
            <img src={property.images[0]} alt={i18n.language === "ar" ? property.title : property.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-navy-300 text-sm">{t("property.image")}</div>
          )}
        </div>
        <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" aria-label={t("common.toggleFavorite")} />
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
        </Link>
    </Card>
  )
}
