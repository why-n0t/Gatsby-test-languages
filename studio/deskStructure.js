import S from '@sanity/desk-tool/structure-builder'
import {MdSettings} from 'react-icons/md'
import * as I18nS from 'sanity-plugin-intl-input/lib/structure'
// import article from './schemas/documents/article'
import {i18n} from './schemas/documentTranslation'

// import {
//   GrDocumentText as FieldIcon,
//   GrMultiple as DocumentIcon,
//   GrTextAlignLeft as PostIcon,
//   GrUser as AuthorIcon,
//   GrArticle as ArticleIcon
// } from "react-icons/gr";

export const getDefaultDocumentNode = props => {
  if (props.schemaType === 'post') {
    return S.document().views(I18nS.getDocumentNodeViewsForSchemaType(props.schemaType))
  }
  return S.document()
}

const hiddenDocTypes = listItem =>
  !['category', 'person', 'sampleProject', 'siteSettings', 'post'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Sample projects')
        .schemaType('sampleProject')
        .child(S.documentTypeList('sampleProject').title('Sample projects')),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // S.listItem()
      //   .title("Article")
      //   .schemaType("article")
      //   .child(S.documentTypeList("article").title("Articles")),
      S.listItem()
        .title('Post')
        .id('post-docs')
        .schemaType('post')
        .child(
          S.documentList()
            .id('post')
            .title('Posts')
            // Use a GROQ filter to get documents.
            .filter('_type == "post" && (!defined(_lang) || _lang == $baseLang)')
            .params({baseLang: i18n.base})
            .canHandleIntent((_name, params, _context) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'post'
            })
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
