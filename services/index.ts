import { request, gql } from "graphql-request";

const graphqlURL = process.env.GRAPH_CMS_URL

export const getAllArticles = async () => {
  const query = gql`
    query Articles {
      articles {
        createdAt
        excerpt
        id
        publishedAt
        slug
        title
        updatedAt
        content {
          html
        }
        image {
          url
        }
        categories {
          name
        }
      }
    }
  `

  const results = await request(graphqlURL as string, query);
  return results.articles

}

export const getRecentArticles = async (numberOfPosts: number) => {
  const query = gql`
    query Articles($limit: Int!) {
        articles(orderBy: publishedAt_DESC, first: $limit) {
          createdAt
          excerpt
          id
          publishedAt
          slug
          title
          updatedAt
          content {
            html
          }
          image {
            url
          }
          categories {
            name
          }
        }
}
  `

  const results = await request(graphqlURL as string, query, { "limit": numberOfPosts });
  return results.articles
}

export const getAllPingedArticles = async () => {
  const query = gql`
    query Articles {
      articles(where: {isPinned: true}, orderBy: publishedAt_DESC) {
        createdAt
        excerpt
        id
        publishedAt
        slug
        title
        updatedAt
        content {
          html
        }
        image {
          url
        }
        categories {
          name
        }
      }
    }

  `

  const results = await request(graphqlURL as string, query);
  return results.articles

}

export const getSpecificArticle = async (slug: string) => {
  const query = gql`
    query Articles($slug: String!) {
      articles(where: {slug: $slug}) {
        createdAt
        excerpt
        id
        publishedAt
        slug
        title
        updatedAt
        content {
          html
        }
        image {
          url
        }
        categories {
          name
        }
      }
    }
  `

  const results = await request(graphqlURL as string, query, { slug: slug });
  return results.articles

}