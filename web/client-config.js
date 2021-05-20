module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || "h68vg9fr",
    // projectId: process.env.GATSBY_SANITY_PROJECT_ID || "8s2vgbbz",
    dataset: process.env.GATSBY_SANITY_DATASET || "production",
    token: process.env.SANITY_READ_TOKEN
  }
};
