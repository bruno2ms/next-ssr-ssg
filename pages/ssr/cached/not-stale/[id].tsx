import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DEFAULT_CACHE, DEFAULT_SLEEP } from '../../..'
import { LastGenerated } from '../../../../src/LastGenerated'
import { PastResults } from '../../../../src/PastResults'
import sleep from '../../../../src/sleep'

export default function Page({ time }: { time: number }) {
  const [renders, setRender] = useState(0)
  useEffect(() => {
    setRender((prev) => prev + 1)
  }, [time])
  return (
    <section>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <hr />
      <h1>This is SSRed</h1>
      <h2>Cached by 20sec</h2>
      <LastGenerated time={time} />
      <h5>Renders: {renders}</h5>

      <PastResults time={time} />
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res, resolvedUrl }) => {
  console.log(`RUNNING: getServerSideProps: ${resolvedUrl}`)

  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader('Cache-Control', `public, s-maxage=${DEFAULT_CACHE}`)

  await sleep(DEFAULT_SLEEP)
  return { props: { time: new Date().getTime() } }
}
