import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Mail, MapPin, Phone, ArrowLeft } from "lucide-react"
import Logo from "./Logo"

export default function Footer() {
  const { t, i18n } = useTranslation()

  return (
    <footer className="bg-navy-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-navy-200 text-sm leading-relaxed">
              {i18n.language === "ar"
                ? "المنصة الذكية العقارية — شريكك الموثوق في الاستثمار والتملك"
                : "Smart Podium — your trusted partner in investment and ownership"}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              {i18n.language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/properties", label: "nav.properties" },
                { to: "/projects", label: "nav.projects" },
                { to: "/services", label: "nav.services" },
                { to: "/about", label: "nav.about" },
                { to: "/contact", label: "nav.contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-navy-300 hover:text-teal-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <ArrowLeft size={14} className="rtl:rotate-180" />
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              {i18n.language === "ar" ? "الخدمات" : "Services"}
            </h3>
            <ul className="space-y-3 text-navy-300 text-sm">
              {[
                i18n.language === "ar" ? "بيع وشراء العقارات" : "Buy & Sell",
                i18n.language === "ar" ? "إدارة الأملاك" : "Property Management",
                i18n.language === "ar" ? "تقييم عقاري" : "Valuation",
                i18n.language === "ar" ? "استشارات استثمارية" : "Investment Consulting",
                i18n.language === "ar" ? "التسويق العقاري" : "Real Estate Marketing",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              {i18n.language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="space-y-3 text-navy-300 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-teal-400" />
                <span>
                  {i18n.language === "ar"
                    ? "الرياض، حي المال، برج المنصة"
                    : "Riyadh, Al Mal District, Podium Tower"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-teal-400" />
                <span>+966 55 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-teal-400" />
                <span>info@smartpodium.sa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-300 text-sm text-center">
            &copy; {new Date().getFullYear()} {t("common.allRights")}
          </p>
          <div className="flex items-center gap-4">
            {[
              { name: "x", url: "https://x.com/smartpodium" },
              { name: "linkedin", url: "https://linkedin.com/company/smartpodium" },
              { name: "youtube", url: "https://youtube.com/@smartpodium" },
              { name: "instagram", url: "https://instagram.com/smartpodium" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-teal-500 transition-colors"
                aria-label={social.name}
              >
                <span className="text-xs font-bold uppercase">{social.name[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
