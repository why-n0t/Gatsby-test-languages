import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../../lib/helpers";
import Container from "../../components/container";
import GraphQLErrorList from "../../components/graphql-error-list";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { I18nextContext, Link } from "gatsby-plugin-react-i18next";
import { cn, buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockContent from "../../components/block-content";

import * as styles from "../../components/project-preview.module.css";
import * as stylesGrid from "../../components/project-preview-grid.module.css";
import ArticlePreview from "../../components/articlePreview";

import { responsiveTitle3 } from "../../components/typography.module.css";
export const query = graphql`
  query dePage {
    locales: allLocale(filter: { language: { eq: "de" } }) {
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
            de
          }
          excerpt {
            _type
            de {
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
              de
            }
          }
          author {
            bio {
              _key
              _type
              de
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
                title={node.title.de}
                // slug={node.slug.current}
                slug={`/${node.slug.current}/`}
                mainImage={node.mainImage}
                alt={node.mainImage.alt.de}
                excerpt={node.excerpt._rawDe}
                // lang={context.language}
              />
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  );
};

export default MyPage;
