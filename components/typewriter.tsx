'use client'

import { useEffect, useState } from 'react'

// Types each word out, pauses, deletes it, and moves to the next — forever.
export default function Typewriter({
  words,
  className,
}: {
  words: string[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    // Word fully typed → pause, then start deleting.
    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 1700)
      return () => clearTimeout(pause)
    }

    // Word fully deleted → advance to the next word.
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const step = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? 45 : 85,
    )
    return () => clearTimeout(step)
  }, [text, deleting, index, words])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-[rgb(var(--primary))] align-middle" style={{ height: '1em' }} />
    </span>
  )
}
