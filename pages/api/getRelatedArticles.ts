// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ArticleResponse } from '../../types'
import { getRelatedArticles } from '../../services'

function parseArray(array: string) {
  const pomArray = array.split(",")

  for (let i in pomArray) {
    pomArray[i] = pomArray[i].replace(/\[?\]?/g, "")
  }

  return pomArray
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse[]>
) {

  try {

    const categories = parseArray(req.query.categories as string) || []
    const limit = JSON.parse(req.query.limit as string) || 100
    const id = req.query.id as string || ""

    const data: ArticleResponse[] = await getRelatedArticles(categories, limit, id)

    res.status(200).json(data)
  }
  catch (e) {
    res.status(405).end()
  }
}
