'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Emotion = 'happy' | 'excited' | 'curious' | 'sad' | 'surprised' | 'focused' | 'playful'
type Theme = 'morning' | 'afternoon' | 'evening' | 'night' | 'auto'

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
  pupilColor = '#2D2D2D',
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

function EyeBall({
  size = 16,
  pupilSize = 6,
  maxDistance = 5,
  eyeColor = 'white',
  pupilColor = '#2D2D2D',
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
        transition: 'all 0.15s',
      }}
    >
      {!isBlinking && (
        <div
          style={{
            width: pupilSize * scale,
            height: pupilSize * scale,
            borderRadius: '50%',
            backgroundColor: pupilColor,
            transform: `translate(${p.x}px, ${p.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  )
}

// ============================================================================
// CHARACTER STAGE — pink, black, orange, yellow (from the login page)
// ============================================================================

function CharacterStage({
  emotion,
  theme,
}: {
  emotion: Emotion
  theme: string
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const isPinkBlinking = useBlink(3000, 4000)
  const isBlackBlinking = useBlink(2500, 4500)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)

  const [pinkRef, pinkCenter] = useElementCenter()
  const [blackRef, blackCenter] = useElementCenter()
  const [orangeRef, orangeCenter] = useElementCenter()
  const [yellowRef, yellowCenter] = useElementCenter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

  const isSad = emotion === 'sad'
  const isExcited = emotion === 'excited'
  const isSurprised = emotion === 'surprised'

  const leanSkew = (center: { x: number; y: number }) =>
    isSad ? 0 : Math.max(-6, Math.min(6, -(mouse.x - center.x) / 120))

  // Sad: everyone looks down. Looking at each other: converge inward.
  const sadLook = { x: 0, y: 4 }
  const eyeScale = isSurprised ? 1.3 : 1

  const dim =
    isSad ? 'brightness(0.65) saturate(0.7)' : theme === 'night' || theme === 'evening' ? 'brightness(0.9)' : 'none'

  const bounce = (delay: string): CSSProperties =>
    isExcited ? { animation: `sc-bounce 0.6s ease-in-out ${delay} infinite` } : {}

  const droop: CSSProperties = isSad ? { translate: '0 14px' } : {}

  const charBase: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    transformOrigin: 'bottom center',
    transition: 'transform 0.7s ease-in-out, height 0.7s ease-in-out, filter 0.7s ease-in-out',
    filter: dim,
  }

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes sc-bounce {
          0%, 100% { margin-bottom: 0; }
          50% { margin-bottom: 18px; }
        }
      `}</style>

      {/* Pink/red — back layer */}
      <div
        ref={pinkRef}
        style={{
          ...charBase,
          left: 44,
          width: 100,
          height: emotion === 'curious' ? 250 : 232,
          backgroundColor: '#FF4D6D',
          borderRadius: '8px 8px 0 0',
          zIndex: 1,
          transform: `skewX(${leanSkew(pinkCenter)}deg)`,
          ...droop,
          ...bounce('0s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 18,
            left: isLookingAtEachOther ? 32 : 25,
            top: isLookingAtEachOther ? 36 : 24,
            transition: 'all 0.7s ease-in-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={14}
              pupilSize={5}
              maxDistance={4}
              isBlinking={isPinkBlinking}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : isLookingAtEachOther ? 2 : undefined}
              forceLookY={isSad ? sadLook.y : isLookingAtEachOther ? 3 : undefined}
            />
          ))}
        </div>
      </div>

      {/* Black — middle layer */}
      <div
        ref={blackRef}
        style={{
          ...charBase,
          left: 138,
          width: 66,
          height: 178,
          backgroundColor: '#2D2D2D',
          borderRadius: '7px 7px 0 0',
          zIndex: 2,
          transform: isLookingAtEachOther
            ? `skewX(${leanSkew(blackCenter) * 1.5 + 8}deg) translateX(10px)`
            : `skewX(${leanSkew(blackCenter) * 1.5}deg)`,
          ...droop,
          ...bounce('0.1s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 13,
            left: isLookingAtEachOther ? 18 : 15,
            top: isLookingAtEachOther ? 8 : 19,
            transition: 'all 0.7s ease-in-out',
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={12}
              pupilSize={5}
              maxDistance={3}
              isBlinking={isBlackBlinking}
              scale={eyeScale}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : isLookingAtEachOther ? 0 : undefined}
              forceLookY={isSad ? sadLook.y : isLookingAtEachOther ? -3 : undefined}
            />
          ))}
        </div>
      </div>

      {/* Orange — front left semi-circle */}
      <div
        ref={orangeRef}
        style={{
          ...charBase,
          left: 0,
          width: 140,
          height: 118,
          backgroundColor: '#FF9B6B',
          borderRadius: '70px 70px 0 0',
          zIndex: 3,
          transform: `skewX(${leanSkew(orangeCenter)}deg)`,
          ...droop,
          ...bounce('0.2s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 19,
            left: 48,
            top: 52,
            transition: 'all 0.2s ease-out',
          }}
        >
          {[0, 1].map((i) => (
            <Pupil
              key={i}
              size={9}
              maxDistance={4}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : undefined}
              forceLookY={isSad ? sadLook.y : undefined}
            />
          ))}
        </div>
      </div>

      {/* Yellow — front right rounded rectangle */}
      <div
        ref={yellowRef}
        style={{
          ...charBase,
          left: 206,
          width: 84,
          height: 140,
          backgroundColor: '#E8D754',
          borderRadius: '42px 42px 0 0',
          zIndex: 4,
          transform: `skewX(${leanSkew(yellowCenter)}deg)`,
          ...droop,
          ...bounce('0.3s'),
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 15,
            left: 30,
            top: 24,
            transition: 'all 0.2s ease-out',
          }}
        >
          {[0, 1].map((i) => (
            <Pupil
              key={i}
              size={9}
              maxDistance={4}
              mouse={mouse}
              forceLookX={isSad ? sadLook.x : undefined}
              forceLookY={isSad ? sadLook.y : undefined}
            />
          ))}
        </div>
        {/* Mouth line */}
        <div
          style={{
            position: 'absolute',
            width: isSurprised ? 20 : 50,
            height: isSurprised ? 14 : 3,
            backgroundColor: '#2D2D2D',
            borderRadius: 999,
            left: isSurprised ? 32 : 17,
            top: 54,
            transition: 'all 0.3s ease-out',
          }}
        />
      </div>
    </div>
  )
}

// ============================================================================
// SECTION / IDLE / THEME AWARENESS (preserved from previous version)
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
      const sections = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'contact']
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

  return emotion
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
  const emotion = useEmotion()
  const theme = useDetectedTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed bottom-0 right-4 z-50 hidden w-[300px] md:block">
      <div className="pointer-events-none relative h-[280px] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[260px] w-[290px] -translate-x-1/2">
          <CharacterStage emotion={emotion} theme={theme} />
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
