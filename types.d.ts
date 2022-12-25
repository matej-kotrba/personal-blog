export type ArticleResponse = {
  id: string;
  createdAt: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
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