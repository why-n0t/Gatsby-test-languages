// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Document types
import category from "./documents/category";
import person from "./documents/person";
import sampleProject from "./documents/sampleProject";
import siteSettings from "./documents/siteSettings";
import post from "./documents/post";
import article from "./documents/article";
import keyword from "./documents/keyword";

// Object types
import bioPortableText from "./objects/bioPortableText";
import figure from "./objects/figure";
import figTrans from "./objects/figTrans";
import projectMember from "./objects/projectMember";
import projectPortableText from "./objects/projectPortableText";
import simplePortableText from "./objects/simplePortableText";
import richText from "./objects/richText";
import openGraph from "./objects/openGraph";
import captionImage from "./objects/captionImage";
import author from "./documents/author";
import { localeString, localeText, localeRichText } from "./objects/localeString";
import { translateFields } from "./fieldTranslation";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes
    .concat([
      // When added to this list, object types can be used as
      // { type: 'typename' } in other document schemas
      bioPortableText,
      figure,
      figTrans,
      projectMember,
      projectPortableText,
      simplePortableText,
      // The following are document types which will appear
      // in the studio.
      category,
      person,
      sampleProject,
      siteSettings,
      richText,
      openGraph,
      captionImage,
      post,
      localeString,
      localeText,
      localeRichText
      // article
    ])
    .concat(translateFields([article, author, keyword]))
});
