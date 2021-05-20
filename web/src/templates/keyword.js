import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { I18nextContext, useI18next } from "gatsby-plugin-react-i18next";
import * as styles from "../components/project.module.css";
import BlockContent from "../components/block-content";

export const query = graphql`
  query KeywordTemplateQuery($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    keyword: sanityKeyword(id: { eq: $id }) {
      slug {
        current
      }
      title {
        _key
        _type
        en
        de
      }
      description {
        _key
        _type
        en
        de
      }
    }
  }
`;

const KeywordTemplate = props => {
  const context = React.useContext(I18nextContext);
  console.log(context);
  const { data, errors } = props;
  const keyword = data && data.keyword;
  const { t } = useI18next();
  console.log(keyword);
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {/* {keyword && <SEO title={titel || "Untitled"} />} */}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <article className={styles.root}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <h1 className={styles.title}>
                {context.language == "en" ? keyword.title.en : keyword.title.de}
              </h1>
            </div>
            <aside className={styles.metaContent}>
              {keyword.publishedAt}
              {keyword.keywords && keyword.keywords.length > 0 && (
                <div className={styles.categories}>
                  <h3 className={styles.categoriesHeadline}>{t("Keywords")}</h3>
                  <ul>
                    {keyword.keywords.map(keyword => (
                      <li key={keyword._id}>
                        {context.language == "en" ? keyword.title.en : keyword.title.de}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

export default KeywordTemplate;
