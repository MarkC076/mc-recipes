'use strict'

const path = require('path')
const _ = require('lodash')
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
        slug = `/recipe/${relativePath.replace('.md', '')}/`
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

  const recipeTemplate = path.resolve('src/templates/recipeTemplate.js')
  const tagTemplate = path.resolve('src/templates/tagTemplate.js')

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
                ingredients
                thumbnail
                slug
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }

      // Create blog-list pages
      const recipeEdges = result.data.recipes.edges
      const recipesPerPage = 2
      const numPages = Math.ceil(recipeEdges.length / recipesPerPage)
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/recipes` : `/recipes/${i + 1}`,
          component: path.resolve('./src/templates/recipesListPage.tsx'),
          context: {
            limit: recipesPerPage,
            skip: i * recipesPerPage
          }
        })
      })

      const recipes = result.data.recipes

      recipes.edges.forEach(({ node }) => {
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

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      recipes.edges.forEach((item, index) => {
        if (_.get(item, 'node.frontmatter.tags')) {
          tags = tags.concat(item.node.frontmatter.tags)
        }
      })

      // Eliminate duplicate tags
      tags = _.uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: path.resolve(`./src/templates/tagTemplate.tsx`),
          context: {
            tag
          }
        })
      })
      resolve()
    })
  })
}
