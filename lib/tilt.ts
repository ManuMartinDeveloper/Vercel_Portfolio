import type { MouseEvent } from 'react'

// Cursor-follow 3D tilt via inline event handlers. Because these are plain
// functions (not a hook), they work inside .map() with no per-item wrapper.
// Spread onto any element:
//   onMouseMove={tiltMove} onMouseLeave={tiltReset}
// and give it style={{ transition: 'transform 0.2s ease-out' }}.

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function tiltMove(e: MouseEvent<HTMLElement>, max = 8, lift = 6) {
  if (prefersReduced()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-${lift}px)`
}

export function tiltReset(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = ''
}
