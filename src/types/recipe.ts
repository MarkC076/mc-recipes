export interface RecipeTile {
  date: string
  title: string
  thumbnail: string
  slug: string
  tags: Array<string>
}

export interface RecipePost {
  date: string
  title: string
  description: string
  ingredients: Array<string>
  content: string
  image: string
}

export interface RecipeNode {
  node: {
    frontmatter: RecipeTile
  }
}
