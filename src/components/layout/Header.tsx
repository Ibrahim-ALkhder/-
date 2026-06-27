import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Menu, X } from "lucide-react"
import { cn } from "@/utils/cn"
import Logo from "./Logo"
import LanguageToggle from "../common/LanguageToggle"

const navLinks = [
  { path: "/", labelKey: "nav.home" },
  { path: "/properties", labelKey: "nav.properties" },
  { path: "/projects", labelKey: "nav.projects" },
  { path: "/services", labelKey: "nav.services" },
  { path: "/about", labelKey: "nav.about" },
  { path: "/blog", labelKey: "nav.blog" },
  { path: "/contact", labelKey: "nav.contact" },
]

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const isNotHomeRef = useRef(location.pathname !== "/")
  const [scrolled, setScrolled] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    isNotHomeRef.current = location.pathname !== "/"
    setScrolled(window.scrollY > 80 || isNotHomeRef.current)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80 || isNotHomeRef.current)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-700 ease-premium",
        scrolled ? "bg-white/90 backdrop-blur-2xl shadow-sm" : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between mx-auto px-6 transition-all duration-700 ease-premium",
          scrolled ? "max-w-7xl h-20" : "max-w-7xl h-24"
        )}
      >
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                  location.pathname === link.path
                    ? scrolled
                      ? "bg-navy-500/10 text-navy-500"
                      : "bg-white/10 text-white"
                    : scrolled
                      ? "text-navy-700 hover:bg-navy-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle light={!scrolled} />
          <button
            className={cn(
              "lg:hidden p-2 rounded-full transition-colors",
              scrolled ? "hover:bg-navy-50" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 bg-white/95 backdrop-blur-3xl z-50 lg:hidden flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  className="text-3xl font-cairo font-bold text-navy-700 hover:text-teal-500 transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
