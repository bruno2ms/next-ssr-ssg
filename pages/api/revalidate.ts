import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pathname } = req.query

  if (!pathname || typeof pathname !== 'string') {
    return res.status(401).json({ message: 'Invalid pathname' })
  }

  try {
    await res.revalidate(pathname)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
