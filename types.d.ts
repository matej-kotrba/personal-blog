export type ArticleResponse = {
  id: string;
  createdAt: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
  langType: "html" | "css" | "jsx" | "tsx" | "js"
  content: {
    html: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
  }
  image: {
    url: string;
  }
  categories: {
    name: string
  }[]
}

export type CategoryResponse = {
  name: string;
  color: {
    hex: `#${string}`
  }
}