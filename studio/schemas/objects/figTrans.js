export default {
  name: "figTrans",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "localeString",
      options: {
        isHighlighted: true
      }
    },
    {
      name: "alt",
      type: "localeString",
      title: "Alternative text",
      validation: Rule => Rule.error("You have to fill out the alternative text.").required(),
      description: "Important for SEO and accessiblity.",
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption"
    }
  }
};
