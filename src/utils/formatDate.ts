export function formatDate(dateStr: string, lang: 'ar' | 'en' = 'ar'): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
