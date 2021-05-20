// import { Link } from "gatsby";
import React from "react";
import ProjectPreview from "./project-preview";
import { I18nextContext, Link } from "gatsby-plugin-react-i18next";

import * as styles from "./project-preview-grid.module.css";

function ProjectPreviewGrid(props) {
  console.log(props);
  const context = React.useContext(I18nextContext);

  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node =>
            context.language === node.lang ? (
              <li key={node.id}>
                <ProjectPreview {...node} />
              </li>
            ) : null
          )}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref} language={context.language}>
            Browse more
          </Link>
        </div>
      )}
    </div>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: ""
};

export default ProjectPreviewGrid;
