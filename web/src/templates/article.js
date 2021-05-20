import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { I18nextContext, useI18next, Link } from "gatsby-plugin-react-i18next";
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
      keywords {
        description {
          de
          en
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
      }
    }
  }
`;

const ArticleTemplate = props => {
  const context = React.useContext(I18nextContext);
  const { data, errors } = props;
  const article = data && data.sampleProject;

  const titel = context.language == "en" ? article.title.en : article.title.de;
  const allText = context.language == "en" ? article.body._rawEn : article.body._rawDe;
  console.log(article);
  const { languages, originalPath, t } = useI18next();
  console.log(originalPath);
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
              <p>
                Aliqua exercitation id commodo ipsum laborum sunt. Minim nostrud amet est tempor
                nulla cillum non laborum ipsum do nostrud. Anim laborum officia occaecat veniam
                magna veniam. Tempor fugiat magna nostrud elit enim et nisi duis dolor non tempor
                duis deserunt duis. Ea ea sit sunt magna eu pariatur exercitation et pariatur.
                Voluptate aliquip anim sunt excepteur voluptate sit duis minim amet voluptate. Eu
                officia adipisicing veniam eu dolore ea ullamco nulla aliquip id. Anim adipisicing
                deserunt id amet in et adipisicing minim dolore aliqua nisi incididunt incididunt.
                Magna et qui deserunt exercitation et Lorem ipsum incididunt incididunt anim. Sit
                adipisicing qui ex quis adipisicing voluptate reprehenderit ea Lorem. Nostrud tempor
                nostrud Lorem cillum velit ipsum amet aute esse reprehenderit nostrud dolore
                consectetur. Eiusmod culpa adipisicing deserunt adipisicing Lorem adipisicing
                aliquip veniam fugiat ad sunt sit. Excepteur minim quis et esse id nulla id non
                proident in elit ea fugiat. Ex enim do ut eiusmod pariatur duis officia adipisicing
                nulla aliqua dolor qui ullamco ex. Exercitation duis elit tempor nostrud in amet ex
                consectetur dolor nulla. Reprehenderit quis aliquip non esse laborum eiusmod dolor
                qui proident fugiat do eiusmod. Reprehenderit ullamco veniam duis laborum id fugiat
                laborum duis aliqua cupidatat commodo reprehenderit.
              </p>
            </div>
            <aside className={styles.metaContent}>
              {article.publishedAt}
              {article.keywords && article.keywords.length > 0 && (
                <div className={styles.categories}>
                  <h3 className={styles.categoriesHeadline}>{t("Keywords")}</h3>
                  <ul>
                    {article.keywords.map(keyword => (
                      <Link
                        key={keyword._id}
                        to={`/${keyword.slug.current}/`}
                        language={context.language}
                      >
                        {keyword.slug.current}
                        <li>{context.language == "en" ? keyword.title.en : keyword.title.de}</li>
                      </Link>
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

export default ArticleTemplate;
