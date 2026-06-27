import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SlidersHorizontal, LayoutGrid, List, Map } from "lucide-react"
import { cn } from "@/utils/cn"
import { useProperties } from "@/hooks/useProperties"
import FilterPanel from "@/components/properties/FilterPanel"
import PropertyCard from "@/components/properties/PropertyCard"
import Pagination from "@/components/properties/Pagination"
import { Skeleton } from "@/components/ui/Skeleton"

type ViewMode = "grid" | "list" | "map"

export default function Properties() {
  const { t } = useTranslation()
  useEffect(() => { document.title = t("pages.properties.title") }, [t])
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)
  const [view, setView] = useState<ViewMode>("grid")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState("newest")

  const { data, isLoading } = useProperties({
    page,
    limit: 9,
    sortBy: sort as any,
    ...(filters.city ? { city: [filters.city] as any } : {}),
    ...(filters.type ? { type: [filters.type] as any } : {}),
    ...(filters.status ? { status: filters.status as any } : {}),
    ...(filters.bedrooms ? { bedrooms: [parseInt(filters.bedrooms)] } : {}),
    ...(filters.priceMin ? { priceMin: parseInt(filters.priceMin) } : {}),
  })

  useEffect(() => { setPage(1) }, [filters])

  return (
    <div className="pt-24 min-h-screen bg-navy-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("properties.title")}</h1>
          <p className="text-navy-400 mt-2">{t("properties.subtitle")}</p>
        </motion.div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setFilterOpen(true); setView("grid") }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-navy-200 text-navy-600 text-sm hover:border-teal-300 transition-colors lg:hidden"
            >
              <SlidersHorizontal size={16} />
              {t("properties.filters")}
            </button>
            <div className="hidden lg:flex items-center gap-2 bg-white rounded-full border border-navy-200 p-1">
              {(["grid", "list", "map"] as ViewMode[]).map((v) => {
                const Icon = v === "grid" ? LayoutGrid : v === "list" ? List : Map
                return (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      view === v ? "bg-navy-500 text-white" : "text-navy-400 hover:text-navy-600"
                    )}
                  >
                    <Icon size={18} />
                  </button>
                )
              })}
            </div>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-full border border-navy-200 text-sm text-navy-600 bg-white outline-none"
          >
            <option value="newest">{t("properties.sort.newest")}</option>
            <option value="price-asc">{t("properties.sort.priceAsc")}</option>
            <option value="price-desc">{t("properties.sort.priceDesc")}</option>
          </select>
        </div>

        <div className="flex gap-8">
          <FilterPanel
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />

          <div className="flex-1">
            {isLoading ? (
              <div className={cn(view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4")}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={view === "grid" ? "h-80 rounded-2xl" : "h-40 rounded-2xl"} />
                ))}
              </div>
            ) : (
              <>
                {view === "map" ? (
                  <div className="rounded-2xl bg-navy-50 h-[600px] flex items-center justify-center text-navy-400">
                    {t("properties.mapPlaceholder")}
                  </div>
                ) : (
                  <div className={cn(
                    view === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  )}>
                    {(data?.data || []).map((property, i) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <PropertyCard property={property} variant={view === "list" ? "list" : "grid"} />
                      </motion.div>
                    ))}
                  </div>
                )}

                <Pagination
                  page={page}
                  total={data?.total || 0}
                  limit={9}
                  onChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
