import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/utils/cn"

interface PaginationProps {
  page: number
  total: number
  limit: number
  onChange: (page: number) => void
}

export default function Pagination({ page, total, limit, onChange }: PaginationProps) {
  const { t, i18n } = useTranslation()
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  const pages: (number | "ellipsis")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis")
    }
  }

  const PrevIcon = i18n.language === "ar" ? ChevronRight : ChevronLeft
  const NextIcon = i18n.language === "ar" ? ChevronLeft : ChevronRight

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label={t("common.pagination")}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-navy-200 text-navy-500 hover:bg-navy-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <PrevIcon size={18} />
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} className="w-10 h-10 flex items-center justify-center text-navy-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "w-10 h-10 rounded-full text-sm font-medium transition-colors",
              p === page
                ? "bg-teal-500 text-white"
                : "border border-navy-200 text-navy-500 hover:bg-navy-50"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-navy-200 text-navy-500 hover:bg-navy-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <NextIcon size={18} />
      </button>
    </nav>
  )
}
