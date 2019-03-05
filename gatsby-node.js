'use strict'

const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout } = node.frontmatter
      const { relativePath } = getNode(node.parent)

      let slug = permalink

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      })

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        recipes: allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                layout
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                tileContent
                thumbnail
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
      createPaginatedPages({
        edges: result.data.recipes.edges,
        createPage: createPage,
        pageTemplate: 'src/templates/recipesPage.tsx',
        pageLength: 5, // This is optional and defaults to 10 if not used
        pathPrefix: '', // This is optional and defaults to an empty string if not used
        context: {} // This is optional and defaults to an empty object if not used
      })

      result.data.recipes.edges.forEach(({ node }) => {
        const { slug, layout } = node.fields

        createPage({
          path: slug,
          // This will automatically resolve the template to a corresponding
          // `layout` frontmatter in the Markdown.
          //
          // Feel free to set any `layout` as you'd like in the frontmatter, as
          // long as the corresponding template file exists in src/templates.
          // If no template is set, it will fall back to the default `page`
          // template.
          //
          // Note that the template has to exist first, or else the build will fail.
          component: path.resolve(`./src/templates/${layout || 'recipeTemplate'}.tsx`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug
          }
        })
      })
      resolve()
    })
  })
}
