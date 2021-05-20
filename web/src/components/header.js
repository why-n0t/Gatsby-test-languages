// import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn } from "../lib/helpers";
import LanguageModeToggle from "./languageToggle";
import { Link, useTranslation, I18nextContext, useI18next } from "gatsby-plugin-react-i18next";
import * as styles from "./header.module.css";
import { languages } from "../../../studio/schemas/languages";

const Header = ({ onHideNav, onShowNav, showNav }) => {
  const context = React.useContext(I18nextContext);
  const lang = context.language;
  const { languages, originalPath, t } = useI18next();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/" language={context.language}>
            {t("Page title")}
          </Link>
        </div>
        <div>{t("Page title")}</div>
        <LanguageModeToggle toggleId="header" />
        <Link to="/myPage/" language={context.language} className="ml-8">
          Mypage link
        </Link>
        <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol="hamburger" />
        </button>
        <nav className={cn(styles.nav, showNav && styles.showNav)}></nav>
      </div>
    </div>
  );
};

export default Header;
