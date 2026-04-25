'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Emotion = 'happy' | 'excited' | 'curious' | 'sad' | 'playful' | 'surprised' | 'focused'
type Theme = 'morning' | 'afternoon' | 'evening' | 'night' | 'auto'

function Character({
  position,
  color,
  shape,
  mousePos,
  theme,
  currentSection,
  isIdle,
  isMouseOutside,
}: {
  position: [number, number, number]
  color: string
  shape: 'pill' | 'drop' | 'blob' | 'round' | 'sphere'
  mousePos: { x: number; y: number }
  theme: string
  currentSection: string
  isIdle: boolean
  isMouseOutside: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const leftPupilRef = useRef<THREE.Mesh>(null)
  const rightPupilRef = useRef<THREE.Mesh>(null)
  const [emotion, setEmotion] = useState<Emotion>('happy')

  useEffect(() => {
    if (isIdle || isMouseOutside) {
      setEmotion('sad')
      return
    }

    if (currentSection === 'projects') {
      setEmotion('excited')
      return
    }

    if (currentSection === 'about') {
      setEmotion('curious')
      return
    }

    if (currentSection === 'contact') {
      setEmotion('surprised')
      return
    }

    if (currentSection === 'skills' || currentSection === 'education') {
      setEmotion('focused')
      return
    }

    if (currentSection === 'experience') {
      setEmotion('playful')
      return
    }

    setEmotion('happy')
  }, [currentSection, isIdle, isMouseOutside, mousePos])

  const getThemeColor = () => {
    const baseColor = new THREE.Color(color)
    
    if (emotion === 'sad') {
      return baseColor.multiplyScalar(0.5)
    }
    
    if (emotion === 'excited') {
      return baseColor.multiplyScalar(1.15)
    }
    
    if (theme === 'night' || theme === 'evening') {
      return baseColor.multiplyScalar(0.9)
    }
    return baseColor
  }

  useFrame((state) => {
    if (!groupRef.current) return

    if (emotion === 'sad') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03 - 0.3
      groupRef.current.rotation.z = -0.15
      groupRef.current.scale.y = 0.9
    } else if (emotion === 'excited') {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 0.4
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 6) * 0.2
      groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1
    } else if (emotion === 'curious') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.12
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.35
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.08
    } else if (emotion === 'surprised') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2
      groupRef.current.scale.set(1 + Math.sin(state.clock.elapsedTime * 8) * 0.05, 1 + Math.sin(state.clock.elapsedTime * 8) * 0.05, 1)
    } else if (emotion === 'focused') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    } else if (emotion === 'playful') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3.5) * 0.18
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4.5) * 0.12
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    } else {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.5) * 0.12
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
      groupRef.current.scale.set(1, 1, 1)
    }

    if (leftPupilRef.current && rightPupilRef.current) {
      let pupilMovement = 0.15
      
      if (emotion === 'sad') {
        pupilMovement = 0.05
      } else if (emotion === 'excited' || emotion === 'playful') {
        pupilMovement = 0.2
      } else if (emotion === 'surprised') {
        pupilMovement = 0.25
      }
      
      const maxPupilOffset = 0.05
      const clampedX = Math.max(-maxPupilOffset, Math.min(maxPupilOffset, mousePos.x * pupilMovement))
      const clampedY = Math.max(-maxPupilOffset, Math.min(maxPupilOffset, mousePos.y * pupilMovement))
      
      leftPupilRef.current.position.x = clampedX
      leftPupilRef.current.position.y = clampedY
      rightPupilRef.current.position.x = clampedX
      rightPupilRef.current.position.y = clampedY
    }
  })

  const eyeScale = emotion === 'excited' || emotion === 'surprised' ? 1.4 : emotion === 'curious' ? 1.2 : emotion === 'sad' ? 0.7 : 1.1
  const eyeYPosition = emotion === 'sad' ? 0.1 : emotion === 'surprised' ? 0.25 : 0.2

  const getBodyGeometry = () => {
    switch (shape) {
      case 'pill':
        return <capsuleGeometry args={[0.4, 0.8, 16, 32]} />
      case 'drop':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'blob':
        return <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
      case 'round':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'sphere':
        return <capsuleGeometry args={[0.4, 0.8, 16, 32]} />
    }
  }

  const getMouthRotation = () => {
    if (emotion === 'sad') return [0, 0, -0.2]
    if (emotion === 'excited') return [0, 0, Math.PI + 0.2]
    if (emotion === 'surprised') return [0, 0, 0]
    if (emotion === 'curious') return [0, 0, Math.PI]
    return [0, 0, Math.PI]
  }

  const getMouthScale = emotion === 'surprised' ? 1.3 : emotion === 'excited' ? 1.2 : 1

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow>
        {getBodyGeometry()}
        <meshPhysicalMaterial
          color={getThemeColor()}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <group position={[-0.55, -0.1, 0.1]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshPhysicalMaterial
            color={getThemeColor()}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </group>

      <group position={[0.55, -0.1, 0.1]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshPhysicalMaterial
            color={getThemeColor()}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </group>

      <mesh ref={leftEyeRef} position={[-0.18, eyeYPosition, 0.46]} scale={eyeScale}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="white" />
        
        <mesh ref={leftPupilRef} position={[0, 0, 0.12]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
          
          <mesh position={[0.03, 0.03, 0.06]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </mesh>
      </mesh>

      <mesh ref={rightEyeRef} position={[0.18, eyeYPosition, 0.46]} scale={eyeScale}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="white" />
        
        <mesh ref={rightPupilRef} position={[0, 0, 0.12]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
          
          <mesh position={[0.03, 0.03, 0.06]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </mesh>
      </mesh>

      <mesh position={[0, -0.15, 0.48]} rotation={getMouthRotation()} scale={getMouthScale}>
        <torusGeometry args={[emotion === 'surprised' ? 0.08 : 0.12, 0.025, 16, 32, emotion === 'surprised' ? Math.PI * 2 : Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {shape === 'round' && (
        <>
          <mesh position={[0, eyeYPosition, 0.42]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.21, 0.03, 16, 32]} />
            <meshStandardMaterial color="#8B7355" metalness={0.8} />
          </mesh>
        </>
      )}
      
      {shape === 'sphere' && (
        <mesh position={[0, eyeYPosition, 0.42]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.15, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
        </mesh>
      )}
    </group>
  )
}

function MatPlatform({ theme }: { theme: string }) {
  const matRef = useRef<THREE.Mesh>(null)
  
  const getMatColor = () => {
    if (theme === 'night' || theme === 'evening') {
      return '#2D3748'
    }
    return '#E2E8F0'
  }
  
  return (
    <mesh ref={matRef} position={[0, -1.2, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <boxGeometry args={[5, 3, 0.15]} />
      <meshPhysicalMaterial 
        color={getMatColor()} 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

function EnvironmentalElements({ theme }: { theme: string }) {
  const sunRef = useRef<THREE.Group>(null)
  const moonRef = useRef<THREE.Group>(null)
  const eveningSunRef = useRef<THREE.Mesh>(null)
  const cloudRefs = useRef<THREE.Group[]>([])
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
    if (moonRef.current) {
      moonRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
    // Animate evening sun position (setting)
    if (eveningSunRef.current) {
      eveningSunRef.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    // Animate clouds drifting
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud) {
        cloud.position.x += 0.001 * (i % 2 === 0 ? 1 : -1)
      }
    })
  })
  
  return (
    <>
      {theme === 'morning' && (
        <group ref={sunRef} position={[-2, 1.5, -1]}>
          <mesh>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshBasicMaterial color="#FDB813" />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#FDB813" distance={3} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.4, Math.sin((i * Math.PI) / 4) * 0.4, 0]} rotation={[0, 0, (i * Math.PI) / 4]}>
              <boxGeometry args={[0.15, 0.05, 0.02]} />
              <meshBasicMaterial color="#FDB813" />
            </mesh>
          ))}
        </group>
      )}
      
      {theme === 'afternoon' && (
        <group ref={sunRef} position={[2, 1.5, -1]}>
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshBasicMaterial color="#FF9500" />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={0.6} color="#FF9500" distance={3} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.45, Math.sin((i * Math.PI) / 4) * 0.45, 0]} rotation={[0, 0, (i * Math.PI) / 4]}>
              <boxGeometry args={[0.18, 0.06, 0.02]} />
              <meshBasicMaterial color="#FF9500" />
            </mesh>
          ))}
        </group>
      )}
      
      {theme === 'evening' && (
        <>
          <mesh ref={eveningSunRef} position={[2.2, -0.6, -1.2]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshBasicMaterial color="#FF6B35" />
          </mesh>
          <pointLight position={[2.2, -0.6, -1.2]} intensity={0.7} color="#FF6B35" distance={4} />
          
          {/* Small clouds with orange lining */}
          {[
            { pos: [-1.2, 1.2, -1], scale: 0.8 },
            { pos: [0.5, 1.5, -1.1], scale: 0.6 },
            { pos: [1.8, 1.1, -1], scale: 0.7 },
          ].map((cloud, i) => (
            <group 
              key={`cloud-${i}`} 
              position={cloud.pos as [number, number, number]} 
              scale={cloud.scale}
              ref={(el) => {
                if (el) cloudRefs.current[i] = el
              }}
            >
              {/* Cloud body */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial color="#FFF5E1" opacity={0.8} transparent />
              </mesh>
              <mesh position={[0.12, 0.05, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color="#FFF5E1" opacity={0.8} transparent />
              </mesh>
              <mesh position={[-0.1, 0.03, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#FFF5E1" opacity={0.8} transparent />
              </mesh>
              {/* Orange outline/lining */}
              <mesh position={[0, -0.08, 0.01]}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial color="#FF8C42" opacity={0.6} transparent />
              </mesh>
            </group>
          ))}
          
          {/* Small glowing stars appearing */}
          {[
            [2, 1.8, -1],
            [1.5, 1.4, -1],
            [-2.2, 1.6, -1],
            [0.8, 1.9, -1],
            [-0.5, 1.7, -1],
          ].map((pos, i) => (
            <group key={`star-${i}`} position={pos as [number, number, number]}>
              <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#FFE5B4" />
              </mesh>
              <pointLight position={[0, 0, 0]} intensity={0.2} color="#FFE5B4" distance={1} />
            </group>
          ))}
        </>
      )}
      
      {theme === 'night' && (
        <>
          <group ref={moonRef} position={[-1.8, 1.6, -1]}>
            <mesh>
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshBasicMaterial color="#E0E7FF" />
            </mesh>
            <mesh position={[0.08, 0.05, 0.25]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#C7D2FE" />
            </mesh>
            <mesh position={[-0.08, -0.08, 0.25]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#C7D2FE" />
            </mesh>
            <pointLight position={[0, 0, 0]} intensity={0.4} color="#E0E7FF" distance={3} />
          </group>
          
          {[
            [2, 1.8, -1],
            [1.5, 1.3, -1],
            [-2.2, 1.2, -1],
            [1.8, 0.9, -1],
            [-1.2, 0.8, -1],
            [0.5, 1.7, -1],
            [-0.8, 1.5, -1],
          ].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          ))}
        </>
      )}
    </>
  )
}

function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [theme, setTheme] = useState('morning')
  const [currentSection, setCurrentSection] = useState('')
  const [isIdle, setIsIdle] = useState(false)
  const [isMouseOutside, setIsMouseOutside] = useState(false)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })

      setIsIdle(false)
      setIsMouseOutside(false)
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true)
      }, 30000)
    }

    const handleMouseLeave = () => {
      setIsMouseOutside(true)
    }

    const handleMouseEnter = () => {
      setIsMouseOutside(false)
    }

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

    const detectTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'morning'
      setTheme(currentTheme)
    }

    detectTheme()
    const observer = new MutationObserver(detectTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />

      <EnvironmentalElements theme={theme} />

      <Character
        position={[-1.2, 0, 0]}
        color="#E53E3E"
        shape="pill"
        mousePos={mousePos}
        theme={theme}
        currentSection={currentSection}
        isIdle={isIdle}
        isMouseOutside={isMouseOutside}
      />
      <Character
        position={[-0.6, -0.5, 0]}
        color="#9B51E0"
        shape="drop"
        mousePos={mousePos}
        theme={theme}
        currentSection={currentSection}
        isIdle={isIdle}
        isMouseOutside={isMouseOutside}
      />
      <Character
        position={[0, 0.2, 0]}
        color="#48BB78"
        shape="blob"
        mousePos={mousePos}
        theme={theme}
        currentSection={currentSection}
        isIdle={isIdle}
        isMouseOutside={isMouseOutside}
      />
      <Character
        position={[0.6, -0.3, 0]}
        color="#F6AD55"
        shape="round"
        mousePos={mousePos}
        theme={theme}
        currentSection={currentSection}
        isIdle={isIdle}
        isMouseOutside={isMouseOutside}
      />
      <Character
        position={[1.2, 0.1, 0]}
        color="#4299E1"
        shape="sphere"
        mousePos={mousePos}
        theme={theme}
        currentSection={currentSection}
        isIdle={isIdle}
        isMouseOutside={isMouseOutside}
      />
      
      <MatPlatform theme={theme} />
    </>
  )
}

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
        <DropdownMenuItem
          onClick={() => handleThemeChange('auto')}
          className="cursor-pointer"
        >
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

export default function SmartCharacters() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed bottom-0 right-0 w-[400px] h-[340px] z-50 hidden lg:block">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>
      
      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <ThemeSelector />
        </div>
      </div>
    </div>
  )
}
