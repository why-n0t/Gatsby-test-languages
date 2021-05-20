import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
// import { useTranslation } from "react-i18next"; // ging mal
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next";
// import { i18 } from "gatsby-plugin-react-i18next";

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          lang
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  // console.log(useI18next().language);
  const context = React.useContext(I18nextContext);
  // console.log(context);
  const { data, errors } = props;
  const { t } = useTranslation();
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  let siteTitles = t(`${site.title}`);
  // console.log(s);
  return (
    <Layout>
      <SEO title={siteTitles} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>{t(`${siteTitles}`)}</h1>
        <h1>{t("homeWelcome")}</h1>
        {projectNodes && (
          <ProjectPreviewGrid
            title={t("homeLatestProjects")}
            nodes={projectNodes}
            // browseMoreHref="/archive/"
            language={context.language}
          />
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
