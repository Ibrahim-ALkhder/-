import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Logo() {
  const { i18n } = useTranslation()

  return (
    <Link to="/" className="flex items-center shrink-0">
      <img
        src="/logo.jpg"
        alt={i18n.language === "ar" ? "المنصة الذكية العقارية" : "Smart Podium"}
        className="h-8 md:h-10 w-auto object-contain"
      />
    </Link>
  )
}
