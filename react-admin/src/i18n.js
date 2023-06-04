// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';
import kzTranslation from './locales/kz.json';

// Translations for each language
const resources = {
  en: { translation: enTranslation },
  ru: { translation: ruTranslation },
  kz: { translation: kzTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language if translation is not available
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
