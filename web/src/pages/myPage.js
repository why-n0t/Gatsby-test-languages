import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { I18nextContext, Link } from "gatsby-plugin-react-i18next";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "../components/block-content";

import * as styles from "../components/project-preview.module.css";
import * as stylesGrid from "../components/project-preview-grid.module.css";

import { responsiveTitle3 } from "../components/typography.module.css";
import ArticlePreview from "../components/articlePreview";

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
    article: allSanityArticle {
      totalCount
      edges {
        node {
          title {
            _key
            _type
            en
          }
          excerpt {
            _type
            en {
              _key
              _type
              style
              list
              _rawChildren
            }
            _key
            _rawDe
            _rawEn
          }
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
            alt {
              en
            }
          }
          author {
            bio {
              _key
              _type
              en
            }
            name
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

const MyPage = props => {
  // console.log(useI18next().language);
  const context = React.useContext(I18nextContext);
  console.log(context);
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
  const articleNodes = (data || {}).article
    ? mapEdgesToNodes(data.article)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  //   if (!site) {
  //     throw new Error(
  //       'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //     );
  //   }
  console.log(articleNodes);
  return (
    <Layout>
      <SEO title="dafs" description="gfd" />
      <Container>
        <h1 className="bg-red-400">{t("myPage")}</h1>
        <div className={stylesGrid.root}>
          <ul className={stylesGrid.grid}>
            {articleNodes.map(node => (
              <ArticlePreview
                title={node.title.en}
                // slug={node.slug.current}
                slug={`/${node.slug.current}/`}
                mainImage={node.mainImage}
                alt={node.mainImage.alt.en}
                excerpt={node.excerpt._rawEn}
                // lang={context.language}
              />
            ))}
            {/* {articleNodes.map(node => (
              <div>
                <Link
                  className={styles.root}
                  to={`/${node.slug.current}/`}
                  language={context.language}
                >
                  <div className={styles.leadMediaThumb}>
                    {node.mainImage && node.mainImage.asset && (
                      <img
                        src={imageUrlFor(buildImageObj(node.mainImage))
                          .width(600)
                          .height(Math.floor((9 / 16) * 600))
                          .url()}
                        alt={node.mainImage.alt.en}
                      />
                    )}
                  </div>
                  <h3 className={cn(responsiveTitle3, styles.title)}>{node.title.en}</h3>
                  {node.excerpt._rawEn && (
                    <div className={styles.excerpt}>
                      <BlockContent blocks={node.excerpt._rawEn || []} />
                    </div>
                  )}
                </Link>
              </div>
            ))} */}
          </ul>
        </div>
      </Container>
    </Layout>
  );
};

export default MyPage;
