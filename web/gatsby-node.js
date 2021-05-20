const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const extraLanguages = ["de"];
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
  await createMyArticles(graphql, actions, reporter);
};
