import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: 'ru',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
