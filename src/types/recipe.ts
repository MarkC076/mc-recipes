export interface RecipeTile {
  date: string
  title: string
  tileContent: string
  thumbnail: string
  slug: string
}

export interface RecipePost {
  date: string
  title: string
  metaDescription: string
  content: string
  image: string
}

export interface RecipeNode {
  node: {
    frontmatter: RecipeTile
  }
}
