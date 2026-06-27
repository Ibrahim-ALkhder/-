import { useTranslation } from "react-i18next"
import { cn } from "@/utils/cn"
import { useUIStore } from "@/store/uiStore"

interface LanguageToggleProps {
  light?: boolean
}

export default function LanguageToggle({ light = false }: LanguageToggleProps) {
  const { i18n } = useTranslation()
  const { closeAll } = useUIStore()

  const toggle = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    closeAll()
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative w-14 h-8 rounded-full border-2 transition-colors duration-300 overflow-hidden shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
        light ? "border-white/30 hover:border-white/60" : "border-navy-200 hover:border-teal-400"
      )}
      aria-label="Toggle language"
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[11px] font-bold transition-all duration-500 ease-premium",
          light ? "text-white" : "text-navy-700",
          i18n.language === "ar"
            ? "translate-x-0 opacity-100"
            : "-translate-x-4 opacity-0"
        )}
      >
        AR
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[11px] font-bold transition-all duration-500 ease-premium",
          light ? "text-white" : "text-navy-700",
          i18n.language === "en"
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "absolute top-0.5 w-[calc(50%-2px)] h-[calc(100%-4px)] rounded-full bg-teal-400 transition-all duration-500 ease-premium",
          i18n.language === "ar" ? "left-0.5" : "right-0.5"
        )}
      />
    </button>
  )
}
