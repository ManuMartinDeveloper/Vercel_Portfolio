'use client'

import { useEffect } from 'react'
import { confetti } from '@/lib/confetti'

// Konami code → the mascots throw a party. Renders nothing.
const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function EasterEggs() {
  useEffect(() => {
    let idx = 0

    const party = () => {
      window.dispatchEvent(new CustomEvent('portfolio:celebrate', { detail: { big: true } }))
      ;[0, 180, 360, 560].forEach((delay) =>
        setTimeout(
          () =>
            confetti({
              x: window.innerWidth * (0.2 + Math.random() * 0.6),
              y: window.innerHeight * 0.3,
              count: 90,
            }),
          delay,
        ),
      )
    }

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[idx]) {
        idx += 1
        if (idx === KONAMI.length) {
          idx = 0
          party()
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
