export interface RecipeTile {
  date: string
  title: string
  thumbnail: string
  slug: string
}

export interface RecipePost {
  date: string
  title: string
  metaDescription: string
  ingredients: Array<string>
  content: string
  image: string
}

export interface RecipeNode {
  node: {
    frontmatter: RecipeTile
  }
}
