import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { I18nextContext } from "gatsby-plugin-react-i18next";
import * as styles from "../components/project.module.css";
import BlockContent from "../components/block-content";

export const query = graphql`
  query ArticleTemplateQuery($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    sampleProject: sanityArticle(id: { eq: $id }) {
      excerpt {
        _key
        _type
        _rawEn
        _rawDe
        de {
          _key
          _type
          style
          list
          _rawChildren
        }
        en {
          _key
          _type
          style
          list
          _rawChildren
        }
      }
      mainImage {
        alt {
          _key
          _type
          en
          de
        }
        caption {
          _key
          _type
          en
          de
        }
        asset {
          id
          assetId
          _id
        }
      }
      slug {
        _key
        _type
        current
      }
      title {
        _key
        _type
        en
        de
      }
      openGraph {
        _key
        _type
        type
        _rawTitle
        _rawImage
        title {
          _key
          _type
          en
          de
        }
      }
      publishedAt
      id
      body {
        _key
        _type
        _rawEn
        _rawDe
        de {
          _key
          _type
          style
          list
          _rawChildren
        }
        en {
          _key
          _type
          style
          list
          _rawChildren
        }
      }
    }
  }
`;

const ArticleTemplate = props => {
  const context = React.useContext(I18nextContext);
  console.log(context);
  const { data, errors } = props;
  const article = data && data.sampleProject;
  const titel = context.language == "en" ? article.title.en : article.title.de;
  const allText = context.language == "en" ? article.body._rawEn : article.body._rawDe;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {article && <SEO title={titel || "Untitled"} />}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <article className={styles.root}>
        {article.mainImage && article.mainImage.asset && (
          <div className={styles.mainImage}>
            <img
              src={imageUrlFor(buildImageObj(article.mainImage))
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit("crop")
                .url()}
              alt={article.mainImage.alt.en}
            />
          </div>
        )}
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <h1 className={styles.title}>{titel}</h1>
              <BlockContent blocks={allText || []} />
            </div>
            <aside className={styles.metaContent}>
              {article.publishedAt}
              {/* {article.publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(article.publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(article.publishedAt), new Date())
                    : format(new Date(article.publishedAt), "MMMM Do YYYY")}
                </div>
              )} */}
            </aside>
          </div>
        </Container>
      </article>{" "}
    </Layout>
  );
};

export default ArticleTemplate;
