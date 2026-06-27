import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function Contact() {
  const { t, i18n } = useTranslation()
  useEffect(() => { document.title = t("pages.contact.title") }, [t])

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = t("contact.form.errors.nameRequired")
    if (!form.email.trim()) newErrors.email = t("contact.form.errors.emailRequired")
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t("contact.form.errors.emailInvalid")
    if (!form.subject.trim()) newErrors.subject = t("contact.form.errors.subjectRequired")
    if (!form.message.trim()) newErrors.message = t("contact.form.errors.messageRequired")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-xl border text-sm outline-none transition-colors resize-none ${
      errors[field] ? "border-red-400 focus:border-red-500" : "border-navy-200 focus:border-teal-400"
    }`

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("contact.title")}</h1>
          <p className="text-navy-400 mt-2 max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-2">{t("contact.form.success")}</h3>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-teal-600 text-sm underline hover:no-underline"
                >
                  {t("common.send")} {t("contact.form.submit").toLowerCase()} {t("common.submit").toLowerCase()}
                </button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name")}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email")}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <input
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t("contact.form.subject")}
                    className={inputClass("subject")}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message")}
                    rows={5}
                    className={inputClass("message")}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">{t("contact.form.error")}</p>
                )}
                <Button type="submit" disabled={status === "loading"} className="w-full justify-center">
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("common.loading")}
                    </span>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowLeft size={14} className="rtl:rotate-180" />
                      </span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-navy-50 border border-navy-100">
              <h3 className="text-lg font-bold text-navy-700 mb-4">{t("contact.info")}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-700 text-sm">{t("contact.address")}</p>
                    <p className="text-navy-400 text-sm">
                      {i18n.language === "ar" ? "الرياض، حي المال، برج المنصة" : "Riyadh, Al Mal District, Podium Tower"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-700 text-sm">{t("contact.phone")}</p>
                    <p className="text-navy-400 text-sm">+966 55 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-700 text-sm">{t("contact.email")}</p>
                    <p className="text-navy-400 text-sm">info@smartpodium.sa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-700 text-sm">{t("contact.hours")}</p>
                    <p className="text-navy-400 text-sm">
                      {i18n.language === "ar" ? "السبت - الخميس: ٩ ص - ٩ م" : "Sat - Thu: 9 AM - 9 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl bg-navy-100 flex items-center justify-center text-navy-300 text-sm">
              {t("contact.map")}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
