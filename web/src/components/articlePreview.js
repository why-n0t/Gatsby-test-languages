import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
// import { buildImageObj } from "../lib/helpers";
// import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";

// import * as styles from "./project.module.css";

// import React from "react";
// import { graphql } from "gatsby";
// import {
//   mapEdgesToNodes,
//   filterOutDocsWithoutSlugs,
//   filterOutDocsPublishedInTheFuture
// } from "../lib/helpers";
// import Container from "../components/container";
// import GraphQLErrorList from "../components/graphql-error-list";
// import SEO from "../components/seo";
// import Layout from "../containers/layout";
// import { useTranslation } from "gatsby-plugin-react-i18next";
// import { I18nextContext, Link } from "gatsby-plugin-react-i18next";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
// import BlockContent from "../components/block-content";

import * as styles from "../components/project-preview.module.css";
import * as stylesGrid from "../components/project-preview-grid.module.css";

import { responsiveTitle3 } from "../components/typography.module.css";

function ArticlePreview({ title, slug, mainImage, alt, excerpt, lang }) {
  // console.log(props);
  // const { title, slug, mainImage, alt, excerpt, lang } = props;
  // const { articleNodes } = props;

  return (
    <div>
      <Link className={styles.root} to={`/${slug.current}/`} language={lang}>
        <div className={styles.leadMediaThumb}>
          {mainImage && mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .url()}
              alt={alt}
            />
          )}
        </div>
        <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
        {excerpt && (
          <div className={styles.excerpt}>
            <BlockContent blocks={excerpt || []} />
          </div>
        )}
      </Link>
    </div>
  );
}

export default ArticlePreview;
