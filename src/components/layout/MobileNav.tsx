import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Home, Building2, Layers, Menu } from "lucide-react"
import { cn } from "@/utils/cn"

const links = [
  { path: "/", icon: Home, labelKey: "nav.home" },
  { path: "/properties", icon: Building2, labelKey: "nav.properties" },
  { path: "/projects", icon: Layers, labelKey: "nav.projects" },
  { path: "/contact", icon: Menu, labelKey: "nav.contact" },
]

export default function MobileNav() {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy-100 pb-safe">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => {
          const isActive = location.pathname === link.path
          const Icon = link.icon
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors",
                isActive ? "text-teal-500" : "text-navy-400"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{t(link.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
