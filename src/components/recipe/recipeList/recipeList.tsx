import * as React from 'react'
import { RecipeNode } from '../../../types/recipe'
import RecipeTile from '../recipeListTile/recipeListTile'
import StyledDiv from './recipeList.css'

interface IRecipeListProps {
  recipes?: Array<RecipeNode>
}

class RecipeList extends React.Component<IRecipeListProps, {}> {
  renderTiles = () => {
    if (this.props.recipes !== null && this.props.recipes !== undefined && this.props.recipes.length > 0) {
      return this.props.recipes.map(({ node }: RecipeNode, index: number) => <RecipeTile key={index} tile={node.frontmatter} />)
    } else {
      return <p>No data found</p>
    }
  }

  render() {
    return (
      <StyledDiv>
        <div>{this.renderTiles()}</div>
      </StyledDiv>
    )
  }
}

export default RecipeList
