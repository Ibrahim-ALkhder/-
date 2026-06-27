import { useRef, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { Building2, Users, Award, TrendingUp } from "lucide-react"
import { useStats } from "@/hooks/useStats"

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true
    const duration = 2000
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, to])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count}{to > 100 ? "+" : to === 98 ? "%" : "+"}
    </span>
  )
}

export default function Stats() {
  const { t } = useTranslation()
  const { data } = useStats()
  const statsData = data?.data

  const stats = statsData
    ? [
        { key: "properties", icon: Building2, value: statsData.propertiesCount },
        { key: "clients", icon: Users, value: statsData.clientsCount },
        { key: "experience", icon: Award, value: statsData.experienceYears },
        { key: "growth", icon: TrendingUp, value: statsData.projectsCount },
      ]
    : []

  return (
    <section className="py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
                  <Icon size={28} className="text-teal-400" />
                </div>
                <Counter to={stat.value} />
                <p className="text-navy-300 text-sm mt-1">{t(`home.stats.${stat.key}`)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
