import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Hero from "@/components/home/Hero"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import Stats from "@/components/home/Stats"
import Services from "@/components/home/Services"
import Testimonials from "@/components/home/Testimonials"
import Partners from "@/components/home/Partners"
import CTASection from "@/components/home/CTASection"

export default function Home() {
  const { t } = useTranslation()
  useEffect(() => { document.title = t("pages.home.title") }, [t])
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Stats />
      <Services />
      <Testimonials />
      <Partners />
      <CTASection />
    </>
  )
}
