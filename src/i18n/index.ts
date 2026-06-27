import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ar from './locales/ar.json'
import en from './locales/en.json'

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  fallbackLng: 'ar',
  lng: localStorage.getItem('i18nextLng') || 'ar',
  interpolation: { escapeValue: false },
})

document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
document.documentElement.lang = i18n.language

i18n.on('languageChanged', (lng: string) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lng
  localStorage.setItem('i18nextLng', lng)
})

export default i18n
