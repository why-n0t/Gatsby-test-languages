import { format } from "date-fns";
import { baseLanguage } from "../languages";

export default {
  name: "sampleProject",
  title: "Sample project",
  type: "document",
  fields: [
    {
      name: "lang",
      title: "Language",
      type: "string"
    },
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the project",
      options: {
        // How you could manually specify a translated field, should you have
        // to.
        source: `title.${baseLanguage.name}`
      },
      localize: false
    },
    {
      name: "publishedAt",
      title: "Published at",
      description: "You can use this field to schedule projects where you show them",
      type: "datetime"
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "simplePortableText"
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "projectMember" }]
    },
    {
      name: "startedAt",
      title: "Started at",
      type: "datetime"
    },
    {
      name: "endedAt",
      title: "Ended at",
      type: "datetime"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "figure"
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "body",
      title: "Body",
      type: "projectPortableText"
    },
    {
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      of: [{ type: "reference", to: { type: "sampleProject" } }]
    }
  ],
  preview: {
    select: {
      title: "title",
      lang: "lang",
      publishedAt: "publishedAt",
      slug: "slug",
      media: "mainImage"
    },
    prepare({ title = "No title", publishedAt, slug = {}, media, lang }) {
      const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/${dateSegment}/${slug.current}/`;
      return {
        title,
        lang,
        media,
        subtitle: publishedAt ? path : "Missing publishing date"
      };
    }
  }
};
