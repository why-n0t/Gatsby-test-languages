// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});

const clientConfig = require("./client-config");
// require("i18next-browser-languagedetector");
const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: `Follow The Grain`,
    siteUrl: `https://google.de`
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/i18n/react-i18next`,
        // path: `./i18n/react-i18next`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `de`],
        defaultLanguage: `en`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://example.com/`,
        // you can pass any i18next options
        i18nextOptions: {
          defaultNS: "translation",
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: "/:lang?/:uid",
            getLanguageFromPath: true,
            excludeLanguages: ["en", "de"]
          },
          {
            matchPath: "/:lang?/keyword/:uid",
            getLanguageFromPath: true,
            excludeLanguages: ["en", "de"]
          }
          // {
          //   matchPath: "/404",
          //   languages: ["en", "de"]
          // },
          // {
          //   matchPath: "/:lang?/",
          //   languages: ["en", "de"]
          // }
        ]
      }
    }
    // {
    //   resolve: `gatsby-theme-i18n`,
    //   options: {
    //     defaultLang: `en`,
    //     configPath: require.resolve(`./i18n/config.json`),
    //     prefixDefault: false
    //   }
    // },
    // {
    //   resolve: `gatsby-theme-i18n-react-i18next`,
    //   options: {
    //     locales: `./i18n/react-i18next`,
    //     i18nextOptions: {
    //       // ns: ["translation"],
    //       debug: true,
    //       keySeparator: false, // we do not use keys in form messages.welcome
    //       fallbackLng: "en",
    //       detection: {
    //         order: [
    //           "localStorage",
    //           "querystring",
    //           "cookie",
    //           "sessionStorage",
    //           "navigator",
    //           "htmlTag",
    //           "path",
    //           "subdomain"
    //         ]
    //       }
    //       // backend: {
    //       //   loadPath: "./i18n/react-i18next/{{lng}}/translation.json"
    //       // }
    //     }
    //   }
    // }
  ]
};
