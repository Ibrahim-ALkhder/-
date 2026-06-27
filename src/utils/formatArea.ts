export function formatArea(area: number, lang: 'ar' | 'en' = 'ar'): string {
  const formatted = area.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')
  return `${formatted} م²`
}
