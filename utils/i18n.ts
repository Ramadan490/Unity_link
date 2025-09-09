import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import ar from '../locales/ar.json';
import en from '../locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag, isRTL } = RNLocalize.getLocales()[0] || fallback;

// Configure RTL when Arabic
if (languageTag.startsWith('ar') && !I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} else if (!languageTag.startsWith('ar') && I18nManager.isRTL) {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: languageTag.startsWith('ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
