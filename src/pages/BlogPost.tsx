import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ChevronLeft, Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { formatDate } from "@/utils/formatDate"
import { useBlogPost } from "@/hooks/useBlogPosts"

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { data: response, isLoading } = useBlogPost(id || "")
  const post = response?.data
  useEffect(() => {
    if (post) {
      document.title = `${i18n.language === "ar" ? post.titleAr : post.titleEn} | ${t("pages.home.title")}`
    } else {
      document.title = t("pages.blogPost.title")
    }
  }, [post, i18n.language, t])

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Skeleton className="h-10 w-16 mb-6" />
          <Skeleton className="h-[400px] rounded-2xl mb-8" />
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-6" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-700 mb-2">{t("blog.notFound")}</h2>
          <button onClick={() => navigate("/blog")} className="text-teal-500 hover:underline">
            {t("blog.backToBlog")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-navy-400 hover:text-navy-600 transition-colors mb-6 text-sm"
          >
            <ChevronLeft size={16} className="rtl:rotate-180" />
            {t("common.back")}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="aspect-[21/9] rounded-2xl relative overflow-hidden bg-navy-100 mb-8">
            {post.image ? (
              <img src={post.image} alt={i18n.language === "ar" ? post.titleAr : post.titleEn} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-navy-300">{t("blog.image")}</div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="teal">
              {i18n.language === "ar" ? post.categoryAr : post.categoryEn}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700 mb-4">
            {i18n.language === "ar" ? post.titleAr : post.titleEn}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-navy-400 text-sm mb-8 pb-6 border-b border-navy-100">
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} {t("blog.minRead")}
            </span>
          </div>

          <div className="prose prose-navy max-w-none">
            <p className="text-navy-500 leading-relaxed">
              {i18n.language === "ar" ? post.contentAr : post.contentEn}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
