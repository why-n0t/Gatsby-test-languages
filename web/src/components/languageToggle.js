/* eslint-disable react/prop-types */
import React from "react";
// import React, { useContext } from "react";
// import { Link, useI18next } from "gatsby-plugin-react-i18next";

//import Toggle from "react-toggle";
import PropTypes from "prop-types";
// import { LanguageContext } from "../context/languageContext";
// import { motion } from "framer-motion";
// import { buttonAnimation } from "../lib/helpers";
// import i18n from "i18next";
// import "./i18n";

import { useI18next, I18nextContext, Link } from "gatsby-plugin-react-i18next";

export default function LanguageModeToggle({ toggleId }) {
  // const { languages, originalPath, t } = useI18next();
  const { languages, changeLanguage, originalPath } = useI18next();

  // console.log(languages, originalPath, t);
  // const handleLanguageToggle = ({ lng }) => {
  //   // console.log(i18n.language);
  //   // console.log(window.location.href);
  //   // console.log(process.env.GATSBY_LOCALE);
  //   if (lng === "en") {
  //     // changeLanguage("de");
  //     i18n.changeLanguage("de");
  //   } else {
  //     // changeLanguage("en");
  //     i18n.changeLanguage("en");
  //   }
  //   // if (i18n.language === "en") {
  //   //   i18n.changeLanguage("de");
  //   // } else {
  //   //   i18n.changeLanguage("en");
  //   // }
  // };
  // console.log(i18n.language);

  const context = React.useContext(I18nextContext);
  console.log(context);
  return (
    <div className="block mt-4 text-header no-underline md:inline-block md:mt-0 md:ml-6 md:text-base md:font-Mulish md:uppercase">
      {/* <div className=""> */}
      <ul className="">
        {languages.map(lng => (
          <li key={lng}>
            <a
              href={`${context.path}`}
              onClick={e => {
                e.preventDefault();
                changeLanguage(lng);
              }}
            >
              {lng}
            </a>
            {/* <Link
              to={originalPath}
              language={lng}
              onClick={e => {
                e.preventDefault();
                changeLanguage(lng);
              }}
            >
              {lng}
            </Link> */}
          </li>
        ))}
        {/* {languages.map(lng => (
          <li key={lng}>
            <Link to={originalPath} language={lng} onChange={handleLanguageToggle}>
              {lng}
            </Link>
          </li>
        ))} */}
      </ul>
      {/* <input
        type="checkbox"
        name="toggle"
        id={toggleId}
        checked={i18n.language === "en" ? true : false}
        onChange={handleLanguageToggle}
        className="w-6 h-6 appearance-none cursor-pointer hidden"
        //className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        htmlFor={toggleId}
        className="h-6 cursor-pointer"
        title="Toggle language mode"
        //className="toggle-label block overflow-hidden h-6 rounded-full bg-secondary cursor-pointer"
      >
        {i18n.language === "en" ? "DE " : "EN "}
      </label> */}
    </div>
  );
}

LanguageModeToggle.propTypes = {
  toggleId: PropTypes.string.isRequired
};
