import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import sleep from '../../../src/sleep'

export default function Page({ time }: { time: number }) {
  const [renders, setRender] = useState(0)
  useEffect(() => {
    setRender((prev) => prev + 1)
  }, [time])
  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <hr />
      <h1>This is SSRed</h1>
      <h2>Cached by 20sec</h2>
      {time ? <h3>Generated {(new Date().getTime() - time) / 1000}sec ago</h3> : null}
      <h3>Renders: {renders}</h3>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res, resolvedUrl }) => {
  console.log(`RUNNING: getServerSideProps: ${resolvedUrl}`)
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  await sleep(2000)
  return { props: { time: new Date().getTime() } }
}
