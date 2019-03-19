import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page/page'
import Container from '../components/container/container'
import IndexLayout from '../components/layout/layout'
import { RecipePost } from '../types/recipe'
import MetaData from '../components/metaData/metaData'

interface IRecipeTemplateProps {
  data: {
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
        <MetaData title={recipe.frontmatter.title} description={recipe.frontmatter.description} />
        <Page>
          <Container>
            <h1>{recipe.frontmatter.title}</h1>
            <div>
              <div>
                <img src={recipe.frontmatter.image} alt={recipe.frontmatter.title} />
              </div>
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {recipe.frontmatter.ingredients.map(ingredient => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Method</h3>
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
    recipe: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        ingredients
        image
      }
    }
  }
`
