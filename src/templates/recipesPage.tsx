import * as React from 'react'
import { RecipeNode } from '../types/recipe'

import Page from '../components/page/page'
import Container from '../components/container/container'
import IndexLayout from '../components/layout/layout'

interface IRecipePageProps {
  pathContext: {
    group: Array<RecipeNode>
    index: number
    pageCount: number
  }
}

class RecipesPage extends React.Component<IRecipePageProps, {}> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <IndexLayout>
        <Page>
          <Container>
            <h1>Hi!</h1>
          </Container>
        </Page>
      </IndexLayout>
    )
  }
}

export default RecipesPage
