const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanitySampleProject(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            title
            publishedAt
            slug {
              current
            }
            lang
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanitySampleProject || {}).edges || [];

  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    // .filter(edge => (edge.node.lang === "en" ? true : false))
    .forEach(edge => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      // const neslug = slug.charAt(0) === "d" ? slug.substring(3) : slug;
      const path = `/${slug}/`;
      const lang = edge.node.lang;
      // let nelang = lang === "en" ? "en" : lang;
      reporter.info(`Creating blog post page: ${path} ${lang}`);

      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id, locale: lang }
      });
    });
}

async function createMyArticles(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityArticle(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            title {
              _key
              _type
              en
              de
            }
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;
  const articleEdges = (result.data.allSanityArticle || {}).edges || [];

  articleEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      const path = `/${slug}/`;
      const lang = "en";

      reporter.info(`Creating myArticle post page: ${path} ${lang}`);
      createPage({
        path,
        component: require.resolve("./src/templates/article.js"),
        context: { id, locale: lang }
      });

      const de_path = `/de/${slug}/`;
      const de_lang = "de";
      reporter.info(`Creating myArticle post page: ${de_path} ${de_lang}`);

      createPage({
        path: de_path,
        component: require.resolve("./src/templates/article.js"),
        context: { id, locale: de_lang }
      });
    });
}

// keyword pages -------------------------------------------
async function createKeywordPages(graphql, actions, reporter) {
  // Get Gatsby‘s method for creating new pages
  const { createPage } = actions;
  // Query Gatsby‘s GraphAPI for all the categories that come from Sanity
  const result = await graphql(`
    {
      allSanityKeyword {
        nodes {
          slug {
            current
          }
          id
        }
      }
    }
  `);
  // If there are any errors in the query, cancel the build and tell us
  if (result.errors) throw result.errors;

  // Let‘s gracefully handle if allSanityKeyword is null
  const keywordNodes = (result.data.allSanityKeyword || {}).nodes || [];

  keywordNodes
    // Loop through the category nodes, but don't return anything
    .forEach(node => {
      // Desctructure the id and slug fields for each category
      const { id, slug = {} } = node;
      // If there isn't a slug, we want to do nothing
      if (!slug) return;

      // Make the URL with the current slug
      const path = `/${slug.current}/`;
      const lang = "en";

      // Create the page using the URL path and the template file, and pass down the id
      // that we can use to query for the right category in the template file
      reporter.info(`Creating keyword page: ${path} ${lang}`);

      createPage({
        path,
        component: require.resolve("./src/templates/keyword.js"),
        context: { id, locale: lang }
      });

      const de_path = `/de/${slug.current}/`;
      const de_lang = "de";
      reporter.info(`Creating keyword page: ${de_path} ${de_lang}`);

      createPage({
        path: de_path,
        component: require.resolve("./src/templates/keyword.js"),
        context: { id, locale: de_lang }
      });
    });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
  await createMyArticles(graphql, actions, reporter);
  await createKeywordPages(graphql, actions, reporter);
};
