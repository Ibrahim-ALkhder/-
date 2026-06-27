import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { formatDate } from "@/utils/formatDate"
import { useBlogPosts } from "@/hooks/useBlogPosts"

export default function Blog() {
  const { t, i18n } = useTranslation()
  useEffect(() => { document.title = t("pages.blog.title") }, [t])
  const { data, isLoading } = useBlogPosts()

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const posts = data?.data || []

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-cairo font-bold text-navy-700">{t("blog.title")}</h1>
          <p className="text-navy-400 mt-2">{t("blog.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/blog/${post.id}`}>
                <Card hover className="h-full">
                  <div className="aspect-[16/9] relative overflow-hidden bg-navy-100">
                    {post.image ? (
                      <img src={post.image} alt={i18n.language === "ar" ? post.titleAr : post.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-300 text-sm">{t("blog.image")}</div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="teal">
                        {i18n.language === "ar" ? post.categoryAr : post.categoryEn}
                      </Badge>
                      <span className="text-navy-400 text-xs">{formatDate(post.date)}</span>
                    </div>
                    <h3 className="font-bold text-navy-700 line-clamp-2 group-hover:text-teal-500 transition-colors">
                      {i18n.language === "ar" ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="text-navy-400 text-sm line-clamp-2">
                      {i18n.language === "ar" ? post.excerptAr : post.excerptEn}
                    </p>
                    <div className="flex items-center gap-2 text-navy-400 text-xs">
                      <span>{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-navy-300" />
                      <span>{post.readTime} {t("blog.minRead")}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
