import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page/page'
import Container from '../components/container/container'
import IndexLayout from '../components/layout/layout'
import { RecipePost } from '../types/recipe'

interface IRecipeTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    recipe: {
      html: string
      frontmatter: RecipePost
    }
  }
}

class RecipeTemplate extends React.Component<IRecipeTemplateProps, {}> {
  render() {
    const recipe = this.props.data.recipe
    return (
      <IndexLayout>
        <Page>
          <Container>
            <h1>{recipe.frontmatter.title}</h1>
            <div>
              <div>
                <img src={recipe.frontmatter.image} alt={recipe.frontmatter.title} />
              </div>
              <div>
                <p>{recipe.frontmatter.date}</p>
                <div dangerouslySetInnerHTML={{ __html: recipe.html }} />
              </div>
            </div>
          </Container>
        </Page>
      </IndexLayout>
    )
  }
}

export default RecipeTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    recipe: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        metaDescription
        image
      }
    }
  }
`
