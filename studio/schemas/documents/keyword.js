import { baseLanguage } from "../languages";

export default {
  name: "keyword",
  title: "Keyword",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString"
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        // How you could manually specify a translated field, should you have
        // to.
        source: `title.${baseLanguage.name}`
      },
      localize: false
    },
    {
      name: "description",
      type: "localeText",
      title: "Description"
    }
  ],
  orderings: [
    {
      title: "Name",
      by: [{ field: "title", direction: "asc" }]
    }
  ]
};
