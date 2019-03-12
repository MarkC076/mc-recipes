import * as React from 'react'
import Link from 'gatsby-link'
import StyledDiv from './recipeListTile.css'
import { RecipeTile } from '../../../types/recipe'

interface IRecipeTileProps {
  tile: RecipeTile
}

const RecipeListTile = ({ tile }: IRecipeTileProps) => (
  <StyledDiv>
    <div className="imgHolder" />
    <div className="content">
      <h4 className="title">{tile.title}</h4>
      <img src={tile.thumbnail} alt={tile.title} />
    </div>
    <Link to={`/recipe/${tile.slug}`} className="readMore">
      View Recipe
    </Link>
  </StyledDiv>
)

export default RecipeListTile
