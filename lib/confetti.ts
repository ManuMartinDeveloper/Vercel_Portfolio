// Tiny, dependency-free confetti burst.
// Spawns a transient full-screen canvas, fires a batch of particles from an
// origin point, animates them with gravity + spin, then removes itself.
// Respects prefers-reduced-motion.

type ConfettiOptions = {
  x?: number
  y?: number
  count?: number
  spread?: number
  colors?: string[]
  scalar?: number
}

// Swarovski-inspired crystal palette: rose, amethyst, aquamarine, citrine.
const DEFAULT_COLORS = ['#FF7EC0', '#B07BE8', '#5FD2DA', '#FFD24A', '#8b5cf6', '#ffffff']

export function confetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const W = window.innerWidth
  const H = window.innerHeight
  const {
    x = W / 2,
    y = H / 3,
    count = 110,
    spread = Math.PI,
    colors = DEFAULT_COLORS,
    scalar = 1,
  } = options

  const canvas = document.createElement('canvas')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = W * dpr
  canvas.height = H * dpr
  canvas.style.cssText = `position:fixed;inset:0;width:${W}px;height:${H}px;pointer-events:none;z-index:9999`
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.scale(dpr, dpr)

  type P = {
    x: number
    y: number
    vx: number
    vy: number
    rot: number
    vr: number
    size: number
    color: string
    life: number
  }
  const particles: P[] = []
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread
    const speed = (Math.random() * 6 + 4) * scalar
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
      vy: Math.sin(angle) * speed - Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      size: (Math.random() * 6 + 5) * scalar,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1,
    })
  }

  const gravity = 0.22
  const drag = 0.992
  const start = performance.now()
  let raf = 0

  const frame = (now: number) => {
    const elapsed = now - start
    ctx.clearRect(0, 0, W, H)
    let alive = false
    for (const p of particles) {
      p.vx *= drag
      p.vy = p.vy * drag + gravity
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      if (elapsed > 1200) p.life -= 0.02
      if (p.life > 0 && p.y < H + 40) {
        alive = true
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
    }
    if (alive && elapsed < 4000) {
      raf = requestAnimationFrame(frame)
    } else {
      cancelAnimationFrame(raf)
      canvas.remove()
    }
  }
  raf = requestAnimationFrame(frame)
}
