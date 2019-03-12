import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page/page'
import Container from '../components/container/container'
import IndexLayout from '../components/layout/layout'
import RecipeList from '../components/recipe/recipeList/recipeList'
import { RecipeNode } from '../types/recipe'

interface IIndexPageProps {
  data: {
    recipes: {
      edges: Array<RecipeNode>
    }
  }
}

class IndexPage extends React.Component<IIndexPageProps, {}> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <IndexLayout>
        <Page>
          <Container>
            <h1>Some recipes</h1>
            <p>Welcome to my recipe site</p>
            <RecipeList recipes={this.props.data.recipes.edges} />
          </Container>
        </Page>
      </IndexLayout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeRecipesQuery {
    recipes: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            thumbnail
            slug
          }
        }
      }
    }
  }
`
