export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '60a0c98d59f588a41d2edd97',
                  title: 'Sanity Studio',
                  name: 'gatsby-test-languages-studio',
                  apiId: '63da4365-701b-4c9e-ba1b-2402e86d5677'
                },
                {
                  buildHookId: '60a0c98de9f7ff70664bf6b7',
                  title: 'Portfolio Website',
                  name: 'gatsby-test-languages',
                  apiId: 'b7267fd4-5002-4926-81bd-84264c8d29f7'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/why-n0t/Gatsby-test-languages',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://gatsby-test-languages.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
