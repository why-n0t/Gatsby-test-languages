import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
import { initReactI18next } from "gatsby-plugin-react-i18next";

// import Backend from "i18next-http-backend";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// const resources = {
//   en: {
//     translation: {
//       homeWelcome: "Welcome englisch"
//     }
//   },
//   de: {
//     translation: {
//       homeWelcome: "Willkommen deutsch"
//     }
//   }
// };

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    fallbackLng: "en",
    debug: true,
    detection: {
      order: [
        "path",
        "localStorage",
        "querystring",
        "cookie",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "subdomain"
      ]
    },
    backend: {
      loadPath: "./react-i18next/{{lng}}/translation.json"
    },
    react: { useSuspense: false }
  });

export default i18n;
