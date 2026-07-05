'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { confetti } from '@/lib/confetti'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Emotion = 'happy' | 'excited' | 'curious' | 'sad' | 'surprised' | 'focused' | 'playful'
type Theme = 'morning' | 'afternoon' | 'evening' | 'night' | 'auto'

// The four mascots, in render order: coral, plum, peach, yellow.
const NAMES = ['Rosa', 'Vio', 'Poco', 'Sunny']
const CLICK_LINES = [
  'Hehe, that tickles!',
  'Hi there! 😄',
  'Boop! 💜',
  'You found me!',
  'We like you!',
  '*happy wiggle*',
]
const SECTION_LINES: Record<string, string> = {
  hero: "Hi! So glad you're here 👋",
  education: 'Top of the class in curiosity 🎓',
  skills: "We've got a tag for everything 🏷️",
  experience: 'Look how far we have come 🚀',
  projects: 'Ooh, EREC is our favourite 👀',
  certifications: 'Shiny badges — click one! ✨',
  contact: 'Say hi, Manu reads them all 💌',
}
// Approx head positions (x = centre, y = from stage top) for floating hearts.
const HEADS = [
  { x: 85, y: 20 },
  { x: 162, y: 74 },
  { x: 61, y: 134 },
  { x: 239, y: 112 },
]

// ============================================================================
// EYE-TRACKING HELPERS (ported from the login page characters)
// ============================================================================

// Measure an element's viewport-center, refreshed on mount/resize/scroll.
function useElementCenter() {
  const ref = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [])
  return [ref, center] as const
}

function lookOffset(
  mouseX: number,
  mouseY: number,
  center: { x: number; y: number },
  maxDistance: number,
) {
  const dx = mouseX - center.x
  const dy = mouseY - center.y
  const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
  const angle = Math.atan2(dy, dx)
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }
}

function useBlink(minMs = 3000, rangeMs = 4000) {
  const [isBlinking, setIsBlinking] = useState(false)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>
    let openTimeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      blinkTimeout = setTimeout(
        () => {
          setIsBlinking(true)
          openTimeout = setTimeout(() => {
            setIsBlinking(false)
            schedule()
          }, 150)
        },
        Math.random() * rangeMs + minMs,
      )
    }
    schedule()
    return () => {
      clearTimeout(blinkTimeout)
      clearTimeout(openTimeout)
    }
  }, [minMs, rangeMs])
  return isBlinking
}

// ============================================================================
// CARTOON SUB-COMPONENTS
// ============================================================================

function Pupil({
  size = 9,
  maxDistance = 5,
  pupilColor = '#3A2E2A',
  mouse,
  forceLookX,
  forceLookY,
}: {
  size?: number
  maxDistance?: number
  pupilColor?: string
  mouse: { x: number; y: number }
  forceLookX?: number
  forceLookY?: number
}) {
  const [pupilRef, center] = useElementCenter()
  const p =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : lookOffset(mouse.x, mouse.y, center, maxDistance)
  return (
    <div
      ref={pupilRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: pupilColor,
        transform: `translate(${p.x}px, ${p.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  )
}

// A soft, rounded eye with a white sclera, a tracking pupil and a tiny catch-light
// highlight for a friendly, dimensional look.
function EyeBall({
  size = 16,
  pupilSize = 6,
  maxDistance = 5,
  eyeColor = '#FFFFFF',
  pupilColor = '#3A2E2A',
  isBlinking = false,
  scale = 1,
  mouse,
  forceLookX,
  forceLookY,
}: {
  size?: number
  pupilSize?: number
  maxDistance?: number
  eyeColor?: string
  pupilColor?: string
  isBlinking?: boolean
  scale?: number
  mouse: { x: number; y: number }
  forceLookX?: number
  forceLookY?: number
}) {
  const [eyeRef, center] = useElementCenter()
  const p =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : lookOffset(mouse.x, mouse.y, center, maxDistance)
  return (
    <div
      ref={eyeRef}
      style={{
        width: size * scale,
        height: isBlinking ? 2 : size * scale,
        borderRadius: '50%',
        backgroundColor: eyeColor,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.15s',
      }}
    >
      {!isBlinking && (
        <div
          style={{
            position: 'relative',
            width: pupilSize * scale,
            height: pupilSize * scale,
            borderRadius: '50%',
            backgroundColor: pupilColor,
            transform: `translate(${p.x}px, ${p.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '12%',
              right: '14%',
              width: Math.max(2, pupilSize * scale * 0.34),
              height: Math.max(2, pupilSize * scale * 0.34),
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
          />
        </div>
      )}
    </div>
  )
}

// Rosy cheeks — two soft blush ovals that add warmth to a face.
function Cheeks({
  left,
  top,
  gap,
  color,
}: {
  left: number
  top: number
  gap: number
  color: string
}) {
  return (
    <div style={{ position: 'absolute', display: 'flex', gap, left, top }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            width: 13,
            height: 8,
            borderRadius: '50%',
            backgroundColor: color,
            filter: 'blur(1.5px)',
          }}
        />
      ))}
    </div>
  )
}

// Friendly SVG mouth — a smile that becomes an "o" when surprised and flips to a
// gentle frown when sad.
function Mouth({
  width,
  left,
  top,
  emotion,
  color = '#5A463E',
}: {
  width: number
  left: number
  top: number
  emotion: Emotion
  color?: string
}) {
  const h = Math.round(width * 0.5)
  if (emotion === 'surprised') {
    return (
      <div
        style={{
          position: 'absolute',
          left: left + width / 2 - 6,
          top,
          width: 13,
          height: 15,
          borderRadius: '50%',
          backgroundColor: color,
          transition: 'all 0.3s ease-out',
        }}
      />
    )
  }
  const sad = emotion === 'sad'
  const d = sad
    ? `M3 ${h - 2} Q ${width / 2} 0 ${width - 3} ${h - 2}`
    : `M3 2 Q ${width / 2} ${h} ${width - 3} 2`
  return (
    <svg
      width={width}
      height={h}
      style={{ position: 'absolute', left, top, overflow: 'visible', transition: 'all 0.3s ease-out' }}
    >
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

// ============================================================================
// CHARACTER STAGE — warm, soft-3D clay versions of the login-page characters
// ============================================================================

// Volume shading: a light source from the upper-left fading to a darker base,
// plus inset highlight/shadow and a soft drop shadow — the "clay" look.
function body3D(hi: string, base: string, shade: string): CSSProperties {
  return {
    backgroundImage: `radial-gradient(120% 100% at 32% 16%, ${hi} 0%, ${base} 48%, ${shade} 100%)`,
    boxShadow:
      'inset 0 9px 15px rgba(255,255,255,0.4), inset 0 -18px 26px rgba(0,0,0,0.14), 0 12px 22px rgba(0,0,0,0.18)',
  }
}

const CHEEK = 'rgba(255,110,125,0.42)'
const MOUTH = '#5A463E'

function CharacterStage({
  emotion,
  theme,
  section,
}: {
  emotion: Emotion
  theme: string
  section: string
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const isCoralBlink = useBlink(3000, 4000)
  const isPlumBlink = useBlink(2500, 4500)
  const isPeachBlink = useBlink(3500, 3500)
  const isYellowBlink = useBlink(2800, 5000)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)

  // --- Interaction state (clicks, hearts, speech, celebration) ---
  const [speech, setSpeech] = useState<string | null>(null)
  const [hearts, setHearts] = useState<{ id: number; i: number }[]>([])
  const [hopIndex, setHopIndex] = useState<number | null>(null)
  const [partying, setPartying] = useState(false)
  const clickedRef = useRef<Set<number>>(new Set())
  const heartId = useRef(0)
  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [coralRef, coralCenter] = useElementCenter()
  const [plumRef, plumCenter] = useElementCenter()
  const [peachRef, peachCenter] = useElementCenter()
  const [yellowRef, yellowCenter] = useElementCenter()

  const speak = (text: string) => {
    setSpeech(text)
    if (speechTimer.current) clearTimeout(speechTimer.current)
    speechTimer.current = setTimeout(() => setSpeech(null), 3600)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Speak a friendly line when the visitor enters a new section.
  useEffect(() => {
    if (section && SECTION_LINES[section]) speak(SECTION_LINES[section])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  // Celebrate on demand (contact form submit, Konami code, etc.).
  useEffect(() => {
    const onCelebrate = () => {
      setPartying(true)
      speak('🎉 Woohoo!')
      setTimeout(() => setPartying(false), 1200)
    }
    window.addEventListener('portfolio:celebrate', onCelebrate as EventListener)
    return () => window.removeEventListener('portfolio:celebrate', onCelebrate as EventListener)
  }, [])

  useEffect(() => {
    return () => {
      if (speechTimer.current) clearTimeout(speechTimer.current)
      if (hopTimer.current) clearTimeout(hopTimer.current)
    }
  }, [])

  // When curious/playful, the characters glance at each other periodically.
  useEffect(() => {
    if (emotion !== 'curious' && emotion !== 'playful') {
      setIsLookingAtEachOther(false)
      return
    }
    let lookTimeout: ReturnType<typeof setTimeout>
    let resetTimeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      lookTimeout = setTimeout(
        () => {
          setIsLookingAtEachOther(true)
          resetTimeout = setTimeout(() => {
            setIsLookingAtEachOther(false)
            schedule()
          }, 900)
        },
        Math.random() * 2500 + 1500,
      )
    }
    schedule()
    return () => {
      clearTimeout(lookTimeout)
      clearTimeout(resetTimeout)
    }
  }, [emotion])

  const handleCharClick = (i: number) => {
    // Hop the clicked character.
    setHopIndex(i)
    if (hopTimer.current) clearTimeout(hopTimer.current)
    hopTimer.current = setTimeout(() => setHopIndex(null), 520)

    // Pop a floating heart.
    const id = heartId.current++
    setHearts((h) => [...h, { id, i }])
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 1000)

    speak(`${NAMES[i]}: ${CLICK_LINES[(Math.random() * CLICK_LINES.length) | 0]}`)

    // Easter egg: greet everyone who clicks all four.
    clickedRef.current.add(i)
    if (clickedRef.current.size === 4) {
      setTimeout(() => {
        speak("🎉 You found all four of us — you're awesome!")
        confetti({ y: window.innerHeight * 0.45 })
      }, 250)
    }
  }

  const isSad = emotion === 'sad'
  const isExcited = emotion === 'excited'
  const isSurprised = emotion === 'surprised'

  const leanSkew = (center: { x: number; y: number }) =>
    isSad ? 0 : Math.max(-6, Math.min(6, -(mouse.x - center.x) / 120))

  // Sad: everyone looks down. Looking at each other: converge inward.
  const sadLook = { x: 0, y: 4 }
  const eyeScale = isSurprised ? 1.25 : 1

  // Keep dimming mild so the clay gradients don't turn muddy.
  const dim = isSad
    ? 'brightness(0.85) saturate(0.85)'
    : theme === 'night' || theme === 'evening'
      ? 'brightness(0.95)'
      : 'none'

  // Idle: gentle breathing. Excited: springy bounce. Clicked / partying: hop.
  const idleAnim = (i: number, delay: string): CSSProperties => {
    if (partying) return { animation: `sc-hop 0.5s ease-in-out ${delay} 2` }
    if (hopIndex === i) return { animation: 'sc-hop 0.5s ease-in-out' }
    return isExcited
      ? { animation: `sc-bounce 0.6s ease-in-out ${delay} infinite` }
      : { animation: `sc-breathe 4s ease-in-out ${delay} infinite` }
  }

  const droop: CSSProperties = isSad ? { translate: '0 12px' } : {}

  const charBase: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    cursor: 'pointer',
    pointerEvents: 'auto',
    transformOrigin: 'bottom center',
    transition: 'transform 0.7s ease-in-out, height 0.7s ease-in-out, filter 0.7s ease-in-out',
    filter: dim,
  }

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes sc-bounce {
          0%, 100% { margin-bottom: 0; }
          50% { margin-bottom: 16px; }
        }
        @keyframes sc-breathe {
          0%, 100% { scale: 1 1; }
          50% { scale: 1.015 1.03; }
        }
        @keyframes sc-hop {
          0%, 100% { translate: 0 0; }
          35% { translate: 0 -22px; }
          70% { translate: 0 0; }
        }
        @keyframes sc-heart {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-42px) scale(1.1); }
        }
        @keyframes sc-pop {
          0% { opacity: 0; transform: translateX(-50%) translateY(6px) scale(0.85); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>

      {/* Speech bubble */}
      {speech && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: -46,
            transform: 'translateX(-50%)',
            maxWidth: 210,
            padding: '8px 12px',
            borderRadius: 14,
            fontSize: 12.5,
            lineHeight: 1.35,
            fontWeight: 500,
            textAlign: 'center',
            backgroundColor: 'rgb(var(--card))',
            color: 'rgb(var(--foreground))',
            border: '1px solid rgb(var(--primary) / 0.18)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
            zIndex: 30,
            pointerEvents: 'none',
            animation: 'sc-pop 0.25s ease-out',
          }}
        >
          {speech}
          <div
            style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              backgroundColor: 'rgb(var(--card))',
              borderRight: '1px solid rgb(var(--primary) / 0.18)',
              borderBottom: '1px solid rgb(var(--primary) / 0.18)',
            }}
          />
        </div>
      )}

      {/* Floating hearts */}
      {hearts.map((ht) => (
        <div
          key={ht.id}
          style={{
            position: 'absolute',
            left: HEADS[ht.i].x,
            top: HEADS[ht.i].y,
            fontSize: 18,
            zIndex: 25,
            pointerEvents: 'none',
            animation: 'sc-heart 1s ease-out forwards',
          }}
        >
          ❤️
        </div>
      ))}

      {/* Warm glow behind the group */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 250,
          height: 190,
          background: 'radial-gradient(circle, rgba(255,160,120,0.22), transparent 70%)',
          filter: 'blur(26px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Soft contact shadow on the ground */}
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 250,
          height: 26,
          background: 'rgba(0,0,0,0.22)',
          borderRadius: '50%',
          filter: 'blur(9px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Coral — back layer */}
      <div
        ref={coralRef}
        onClick={() => handleCharClick(0)}
        style={{
          ...charBase,
          left: 44,
          width: 100,
          height: emotion === 'curious' ? 250 : 232,
          borderRadius: '50px 50px 20px 20px',
          zIndex: 1,
          transform: `skewX(${leanSkew(coralCenter)}deg)`,
          ...body3D('#FFA7B6', '#FF7189', '#EA506E'),
          ...droop,
          ...idleAnim(0, '0s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 18,
            left: isLookingAtEachOther ? 33 : 26,
            top: isLookingAtEachOther ? 38 : 26,
            transition: 'all 0.7s ease-in-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={15}
              pupilSize={6}
              maxDistance={4}
              isBlinking={isCoralBlink}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : isLookingAtEachOther ? 2 : undefined}
              forceLookY={isSad ? sadLook.y : isLookingAtEachOther ? 3 : undefined}
            />
          ))}
        </div>
        <Cheeks left={16} top={50} gap={46} color={CHEEK} />
        <Mouth width={30} left={35} top={52} emotion={emotion} color={MOUTH} />
      </div>

      {/* Plum — middle layer (was black; warmed to a friendly violet) */}
      <div
        ref={plumRef}
        onClick={() => handleCharClick(1)}
        style={{
          ...charBase,
          left: 138,
          width: 66,
          height: 178,
          borderRadius: '33px 33px 14px 14px',
          zIndex: 2,
          transform: isLookingAtEachOther
            ? `skewX(${leanSkew(plumCenter) * 1.5 + 8}deg) translateX(10px)`
            : `skewX(${leanSkew(plumCenter) * 1.5}deg)`,
          ...body3D('#C9B6F2', '#9D82E0', '#7C60C6'),
          ...droop,
          ...idleAnim(1, '0.15s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 13,
            left: isLookingAtEachOther ? 18 : 15,
            top: isLookingAtEachOther ? 12 : 20,
            transition: 'all 0.7s ease-in-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={13}
              pupilSize={5}
              maxDistance={3}
              isBlinking={isPlumBlink}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : isLookingAtEachOther ? 0 : undefined}
              forceLookY={isSad ? sadLook.y : isLookingAtEachOther ? -3 : undefined}
            />
          ))}
        </div>
        <Cheeks left={9} top={40} gap={34} color={CHEEK} />
        <Mouth width={24} left={21} top={42} emotion={emotion} color={MOUTH} />
      </div>

      {/* Peach — front left dome */}
      <div
        ref={peachRef}
        onClick={() => handleCharClick(2)}
        style={{
          ...charBase,
          left: 0,
          width: 140,
          height: 118,
          borderRadius: '70px 70px 24px 24px',
          zIndex: 3,
          transform: `skewX(${leanSkew(peachCenter)}deg)`,
          ...body3D('#FFD2AC', '#FFB07C', '#F28E54'),
          ...droop,
          ...idleAnim(2, '0.3s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 20,
            left: 45,
            top: 42,
            transition: 'all 0.2s ease-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={16}
              pupilSize={6}
              maxDistance={4}
              isBlinking={isPeachBlink}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : undefined}
              forceLookY={isSad ? sadLook.y : undefined}
            />
          ))}
        </div>
        <Cheeks left={38} top={70} gap={52} color={CHEEK} />
        <Mouth width={32} left={54} top={70} emotion={emotion} color={MOUTH} />
      </div>

      {/* Yellow — front right rounded rectangle */}
      <div
        ref={yellowRef}
        onClick={() => handleCharClick(3)}
        style={{
          ...charBase,
          left: 206,
          width: 84,
          height: 140,
          borderRadius: '42px 42px 16px 16px',
          zIndex: 4,
          transform: `skewX(${leanSkew(yellowCenter)}deg)`,
          ...body3D('#FCE79E', '#F4C752', '#E1AD2F'),
          ...droop,
          ...idleAnim(3, '0.45s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 16,
            left: 27,
            top: 30,
            transition: 'all 0.2s ease-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={15}
              pupilSize={6}
              maxDistance={4}
              isBlinking={isYellowBlink}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : undefined}
              forceLookY={isSad ? sadLook.y : undefined}
            />
          ))}
        </div>
        <Cheeks left={18} top={56} gap={40} color={CHEEK} />
        <Mouth width={30} left={27} top={58} emotion={emotion} color={MOUTH} />
      </div>
    </div>
  )
}

// ============================================================================
// SECTION / IDLE / THEME AWARENESS
// ============================================================================

function useEmotion() {
  const [currentSection, setCurrentSection] = useState('')
  const [isIdle, setIsIdle] = useState(false)
  const [isMouseOutside, setIsMouseOutside] = useState(false)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseMove = () => {
      setIsIdle(false)
      setIsMouseOutside(false)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 30000)
    }
    const handleMouseLeave = () => setIsMouseOutside(true)
    const handleMouseEnter = () => setIsMouseOutside(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'certifications', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
            setCurrentSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  let emotion: Emotion = 'happy'
  if (isIdle || isMouseOutside) emotion = 'sad'
  else if (currentSection === 'projects') emotion = 'excited'
  else if (currentSection === 'about') emotion = 'curious'
  else if (currentSection === 'contact') emotion = 'surprised'
  else if (currentSection === 'skills' || currentSection === 'education') emotion = 'curious'
  else if (currentSection === 'experience') emotion = 'playful'
  else if (currentSection === 'certifications') emotion = 'excited'

  return { emotion, section: currentSection }
}

function useDetectedTheme() {
  const [theme, setTheme] = useState('morning')
  useEffect(() => {
    const detectTheme = () => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'morning')
    }
    detectTheme()
    const observer = new MutationObserver(detectTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])
  return theme
}

// ============================================================================
// THEME SELECTOR (unchanged behavior)
// ============================================================================

function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('auto')
  const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, 'auto'>>('morning')

  const themes = [
    { name: 'morning', label: 'Morning', icon: '🌅', time: '6am-12pm' },
    { name: 'afternoon', label: 'Afternoon', icon: '☀️', time: '12pm-6pm' },
    { name: 'evening', label: 'Evening', icon: '🌆', time: '6pm-10pm' },
    { name: 'night', label: 'Night', icon: '🌙', time: '10pm-6am' },
  ]

  function getTimeBasedTheme(): Exclude<Theme, 'auto'> {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    if (hour >= 18 && hour < 22) return 'evening'
    return 'night'
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && savedTheme !== 'auto') {
      setTheme(savedTheme)
      setCurrentTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const timeTheme = getTimeBasedTheme()
      setCurrentTheme(timeTheme)
      document.documentElement.setAttribute('data-theme', timeTheme)
    }
  }, [])

  useEffect(() => {
    if (theme === 'auto') {
      const timeTheme = getTimeBasedTheme()
      setCurrentTheme(timeTheme)
      document.documentElement.setAttribute('data-theme', timeTheme)

      const interval = setInterval(() => {
        const newTimeTheme = getTimeBasedTheme()
        if (newTimeTheme !== currentTheme) {
          setCurrentTheme(newTimeTheme)
          document.documentElement.setAttribute('data-theme', newTimeTheme)
        }
      }, 60000)

      return () => clearInterval(interval)
    } else {
      setCurrentTheme(theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme, currentTheme])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-card/90 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all pointer-events-auto px-4"
        >
          Themes
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 bg-card/95 backdrop-blur-sm pointer-events-auto">
        <DropdownMenuItem onClick={() => handleThemeChange('auto')} className="cursor-pointer">
          <span className="mr-2">🔄</span>
          <span>Auto (Time-based)</span>
          {theme === 'auto' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => handleThemeChange(t.name as Theme)}
            className="cursor-pointer"
          >
            <span className="mr-2">{t.icon}</span>
            <div className="flex flex-col">
              <span>{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.time}</span>
            </div>
            {theme === t.name && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ============================================================================
// MAIN WIDGET
// ============================================================================

export default function SmartCharacters() {
  const [isClient, setIsClient] = useState(false)
  const { emotion, section } = useEmotion()
  const theme = useDetectedTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed bottom-0 right-4 z-50 hidden w-[300px] md:block">
      <div className="pointer-events-none relative h-[280px]">
        <div className="absolute bottom-0 left-1/2 h-[260px] w-[290px] -translate-x-1/2">
          <CharacterStage emotion={emotion} theme={theme} section={section} />
        </div>
      </div>

      <div className="pointer-events-none flex justify-center pb-2">
        <div className="pointer-events-auto">
          <ThemeSelector />
        </div>
      </div>
    </div>
  )
}
