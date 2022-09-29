import { GetServerSideProps, GetStaticProps } from 'next'
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
      <h1>This is Static Site Generated</h1>
      <h2>With blocking</h2>
      {time ? <h3>Generated {(new Date().getTime() - time) / 1000}sec ago</h3> : null}
      <h3>Renders: {renders}</h3>
    </div>
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
  await sleep(2000)

  return {
    props: { time: new Date().getTime() },
    // If you set a revalidate time of 60, all visitors will see the same generated version of your
    // site for one minute. The only way to invalidate the cache is from someone visiting that page
    // after the minute has passed.
    revalidate: 10,
  }
}
