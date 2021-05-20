import {languages} from '../languages'

const getLocaleOfType = type => {
  return languages.map((language, i) => ({
    title: language.title,
    name: language.name,
    type: type
  }))
}

export const localeString = {
  name: 'localeString',
  title: 'localeString',
  type: 'object',
  fields: getLocaleOfType('string')
}

export const localeText = {
  name: 'localeText',
  title: 'localeText',
  type: 'object',
  fields: getLocaleOfType('text')
}

export const localeRichText = {
  name: 'localeRichText',
  title: 'localeRichText',
  type: 'object',
  fields: getLocaleOfType('richText')
}
