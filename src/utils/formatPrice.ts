export function formatPrice(price: number, lang: 'ar' | 'en' = 'ar'): string {
  const formatted = price.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')
  return lang === 'ar' ? `${formatted} ر.س` : `${formatted} SAR`
}
