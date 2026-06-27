import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Search, MapPin } from "lucide-react"
import { cn } from "@/utils/cn"

const cities = ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar"] as const
const propertyTypes = ["all", "apartment", "villa", "duplex", "office", "land"] as const

export default function SearchBar() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [focused, setFocused] = useState(false)
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [type, setType] = useState("all")
  const [showCity, setShowCity] = useState(false)
  const [showType, setShowType] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
        setShowCity(false)
        setShowType(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (city) params.set("city", city)
    if (type && type !== "all") params.set("type", type)
    navigate(`/properties?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto transition-all duration-500 ease-premium",
        focused ? "max-w-3xl" : "max-w-xl"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded-full border transition-all duration-500 ease-premium",
          focused
            ? "bg-white border-teal-400 shadow-lg shadow-teal-500/10"
            : "bg-white/90 border-white/20"
        )}
      >
        <div className="flex-1 flex items-center gap-2 pl-4">
          <Search
            size={20}
            className={cn(
              "shrink-0 transition-colors duration-300",
              focused ? "text-teal-500" : "text-navy-400"
            )}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={t("home.search.placeholder")}
            className="flex-1 bg-transparent border-none outline-none text-navy-700 placeholder:text-navy-400 text-sm py-2"
          />
        </div>

        {focused && (
          <>
            <div className="relative">
              <button
                onClick={() => { setShowCity(!showCity); setShowType(false) }}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-colors",
                  city ? "bg-teal-50 text-teal-600" : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                )}
              >
                <MapPin size={14} />
                {city || t("home.search.city")}
              </button>
              {showCity && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-navy-100 p-2 min-w-[150px] z-20">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCity(c === city ? "" : c); setShowCity(false) }}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-xl text-sm transition-colors",
                        city === c ? "bg-teal-50 text-teal-600" : "hover:bg-navy-50 text-navy-600"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setShowType(!showType); setShowCity(false) }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-colors",
                  type !== "all" ? "bg-teal-50 text-teal-600" : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                )}
              >
                {type === "all" ? t("home.search.type") : t(`property.types.${type}`)}
              </button>
              {showType && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-navy-100 p-2 min-w-[150px] z-20">
                  {propertyTypes.map((pt) => (
                    <button
                      key={pt}
                      onClick={() => { setType(pt); setShowType(false) }}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-xl text-sm transition-colors",
                        type === pt ? "bg-teal-50 text-teal-600" : "hover:bg-navy-50 text-navy-600"
                      )}
                    >
                      {pt === "all" ? t("home.search.all") : t(`property.types.${pt}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <button
          onClick={handleSearch}
          className="px-6 py-2.5 rounded-full bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors whitespace-nowrap"
        >
          {t("home.search.cta")}
        </button>
      </div>
    </div>
  )
}
