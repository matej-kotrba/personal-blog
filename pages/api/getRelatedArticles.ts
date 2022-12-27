// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ArticleResponse } from '../../types'
import { getRelatedArticles } from '../../services'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse>
) {
  console.log(req.query.categories)
  // res.status(200).json({ name: 'John Doe' })

  const categories = req.query.categories || []

  getRelatedArticles(req.query.categories, req.query.limit, req.query.id).then()

  res.json([])
}
