import React, { useEffect, useState } from 'react'

export function LastGenerated({ time }: { time: number }) {
  const [render, setRender] = useState(false)
  useEffect(() => {
    setRender(true)
  }, [])

  if (!render || time === undefined || typeof window === undefined) return null
  return <h5>Generated {(new Date().getTime() - time) / 1000}sec ago</h5>
}
