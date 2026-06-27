import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw } from "lucide-react"
import { cn } from "@/utils/cn"

interface FilterPanelProps {
  open: boolean
  onClose: () => void
  filters: Record<string, string>
  setFilters: (f: Record<string, string>) => void
}

const cities = ["riyadh", "jeddah", "mecca", "medina", "dammam"]
const types = ["villa", "apartment", "commercial", "land", "warehouse"]
const statuses = ["for-sale", "for-rent"]
const bedrooms = ["1", "2", "3", "4", "5+"]
const prices = [
  { label: "priceRange.under500k", max: "500000" },
  { label: "priceRange.500k_1m", min: "500000", max: "1000000" },
  { label: "priceRange.1m_2m", min: "1000000", max: "2000000" },
  { label: "priceRange.2m_5m", min: "2000000", max: "5000000" },
  { label: "priceRange.above5m", min: "5000000" },
]

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-navy-700">{title}</h4>
      {children}
    </div>
  )
}

function ChipGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(selected === opt ? "" : opt)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-medium border transition-colors",
            selected === opt
              ? "bg-teal-500 text-white border-teal-500"
              : "bg-white text-navy-500 border-navy-200 hover:border-teal-300"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function FilterPanel({ open, onClose, filters, setFilters }: FilterPanelProps) {
  const { t } = useTranslation()

  const setFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearAll = () => setFilters({})

  const content = (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-navy-700">{t("properties.filters")}</h3>
        <div className="flex items-center gap-2">
          <button onClick={clearAll} className="p-2 rounded-full hover:bg-navy-50 transition-colors" title={t("common.clear")}>
            <RotateCcw size={16} className="text-navy-400" />
          </button>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-navy-50 transition-colors lg:hidden">
            <X size={18} className="text-navy-400" />
          </button>
        </div>
      </div>

      <FilterSection title={t("properties.city")}>
        <ChipGroup options={cities} selected={filters.city || ""} onChange={(v) => setFilter("city", v)} />
      </FilterSection>

      <FilterSection title={t("properties.type")}>
        <ChipGroup options={types} selected={filters.type || ""} onChange={(v) => setFilter("type", v)} />
      </FilterSection>

      <FilterSection title={t("properties.status")}>
        <ChipGroup options={statuses} selected={filters.status || ""} onChange={(v) => setFilter("status", v)} />
      </FilterSection>

      <FilterSection title={t("properties.bedrooms")}>
        <ChipGroup options={bedrooms} selected={filters.bedrooms || ""} onChange={(v) => setFilter("bedrooms", v)} />
      </FilterSection>

      <FilterSection title={t("properties.priceRange")}>
        <div className="space-y-2">
          {prices.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                setFilter(
                  "priceMin",
                  filters.priceMin === range.min ? "" : (range.min || "")
                )
              }
              className={cn(
                "w-full text-left px-4 py-2 rounded-xl text-xs border transition-colors",
                filters.priceMin === (range.min || "")
                  ? "bg-teal-50 text-teal-600 border-teal-200"
                  : "bg-white text-navy-500 border-navy-100 hover:border-teal-200"
              )}
            >
              {t(`properties.${range.label}`)}
            </button>
          ))}
        </div>
      </FilterSection>

      <button
        onClick={onClose}
        className="w-full py-3 rounded-full bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
      >
        {t("common.apply")}
      </button>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto"
          >
            {content}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "hidden lg:block w-72 shrink-0 overflow-y-auto transition-all duration-300 ease-in-out",
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
        )}
      >
        {content}
      </aside>
    </>
  )
}
