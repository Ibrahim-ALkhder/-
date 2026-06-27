import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"

const Home = lazy(() => import("@/pages/Home"))
const Properties = lazy(() => import("@/pages/Properties"))
const PropertyDetail = lazy(() => import("@/pages/PropertyDetail"))
const Projects = lazy(() => import("@/pages/Projects"))
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"))
const Services = lazy(() => import("@/pages/Services"))
const About = lazy(() => import("@/pages/About"))
const Blog = lazy(() => import("@/pages/Blog"))
const BlogPost = lazy(() => import("@/pages/BlogPost"))
const Contact = lazy(() => import("@/pages/Contact"))
const NotFound = lazy(() => import("@/pages/NotFound"))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
