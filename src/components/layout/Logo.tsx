import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/utils/cn"

interface LogoProps {
  variant?: "full" | "icon"
  lang?: "ar" | "en"
  dark?: boolean
}

export default function Logo({ variant = "full", lang, dark = false }: LogoProps) {
  const { i18n } = useTranslation()
  const currentLang = lang || i18n.language

  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <svg width="40" height="40" viewBox="0 0 100 100" className="shrink-0">
        <rect width="100" height="100" rx="20" fill="#0A2F6E" />
        <path
          d="M30 65 L50 30 L70 65"
          stroke="#00C4CC"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 52 L50 42 L55 52"
          stroke="#C9A84C"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="28" r="5" fill="#00C4CC" />
      </svg>
      {variant === "full" && (
        <span className={cn("font-cairo font-bold text-lg whitespace-nowrap", dark ? "text-white" : "text-navy-700")}>
          {currentLang === "ar" ? "المنصة الذكية" : "Smart Podium"}
        </span>
      )}
    </Link>
  )
}
