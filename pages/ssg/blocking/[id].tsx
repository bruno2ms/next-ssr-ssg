import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DEFAULT_CACHE, DEFAULT_SLEEP } from '../..'
import { LastGenerated } from '../../../src/LastGenerated'
import sleep from '../../../src/sleep'
import { PastResults } from '../../../src/PastResults'

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
      <h1>This is Static Site Generated</h1>
      <h2>With blocking</h2>
      <LastGenerated time={time} />
      <h5>Renders: {renders}</h5>

      <PastResults time={time} />
    </section>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('RUNNING: getStaticProps: ssg/blocking')
  await sleep(DEFAULT_SLEEP)

  return {
    props: { time: new Date().getTime() },
    // If you set a revalidate time of 60, all visitors will see the same generated version of your
    // site for one minute. The only way to invalidate the cache is from someone visiting that page
    // after the minute has passed.
    revalidate: DEFAULT_CACHE,
  }
}
