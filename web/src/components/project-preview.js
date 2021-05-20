// import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";

import * as styles from "./project-preview.module.css";
import { responsiveTitle3 } from "./typography.module.css";
import { I18nextContext, Link } from "gatsby-plugin-react-i18next";

function ProjectPreview(props) {
  const context = React.useContext(I18nextContext);
  // console.log(context);
  // console.log(props.slug.current);
  // console.log(props);
  return (
    // <Link className={styles.root} to={`${props.slug.current}`}>
    <Link className={styles.root} to={`${props.slug.current}`} language={context.language}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

export default ProjectPreview;
