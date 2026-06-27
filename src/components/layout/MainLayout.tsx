import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import WhatsAppButton from "../common/WhatsAppButton"
import BackToTop from "../common/BackToTop"

export default function MainLayout() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}
