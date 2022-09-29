import React, { useEffect, useState } from 'react'

export function PastResults({ time }: { time: number }) {
  const [results, setResults] = useState<number[]>([])
  useEffect(() => {
    const results: number[] = JSON.parse(localStorage.getItem(location.pathname) || '[]')
    const newArr = Array.from(new Set([...results, time]))
    setResults(newArr)
    localStorage.setItem(location.pathname, JSON.stringify(newArr))
  }, [time])

  return (
    <div>
      <h5>Past Results:</h5>
      {results.map((r) => (
        <div key={r}>{r}</div>
      ))}
      <hr />
      <h5>Current value: {time}</h5>
    </div>
  )
}
