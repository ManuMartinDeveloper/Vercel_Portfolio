'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Download, Sun, Sunset, Moon, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'morning' | 'afternoon' | 'evening' | 'night' | 'auto'

const themes = [
  { name: 'auto', label: 'Auto', description: 'Time-based', icon: Cloud },
  { name: 'morning', label: 'Morning', description: '6am-12pm', icon: Sun },
  { name: 'afternoon', label: 'Afternoon', description: '12pm-6pm', icon: Sun },
  { name: 'evening', label: 'Evening', description: '6pm-10pm', icon: Sunset },
  { name: 'night', label: 'Night', description: '10pm-6am', icon: Moon },
]

function getTimeBasedTheme(): Exclude<Theme, 'auto'> {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

function getThemeIcon(theme: Theme) {
  switch (theme) {
    case 'morning': return Sun
    case 'afternoon': return Sun
    case 'evening': return Sunset
    case 'night': return Moon
    default: return Cloud
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [theme, setTheme] = useState<Theme>('auto')
  const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, 'auto'>>('morning')

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detect active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme management
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

  const ThemeIcon = getThemeIcon(theme === 'auto' ? currentTheme : theme)

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const id = href.slice(1)
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-[rgb(var(--primary))]">MM</span>
              <span className="hidden sm:inline text-[rgb(var(--foreground))]">.dev</span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-[rgb(var(--primary))] text-white'
                      : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-[rgb(var(--muted))]"
                  >
                    <ThemeIcon className="w-5 h-5 text-[rgb(var(--primary))]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {themes.map((t) => {
                    const Icon = t.icon
                    return (
                      <DropdownMenuItem
                        key={t.name}
                        onClick={() => handleThemeChange(t.name as Theme)}
                        className="cursor-pointer flex items-center gap-3"
                      >
                        <Icon className="w-4 h-4" />
                        <div className="flex flex-col">
                          <span className="font-medium">{t.label}</span>
                          <span className="text-xs text-[rgb(var(--muted-foreground))]">{t.description}</span>
                        </div>
                        {theme === t.name && (
                          <span className="ml-auto text-[rgb(var(--primary))]">&#10003;</span>
                        )}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                asChild
                size="sm"
                className="rounded-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white px-5"
              >
                <a href="/resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-20 left-4 right-4 glass rounded-2xl shadow-lg p-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-[rgb(var(--primary))] text-white'
                      : 'hover:bg-[rgb(var(--muted))]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-[rgb(var(--border))] my-2" />
              
              {/* Mobile Theme Selection */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">Theme</p>
                <div className="flex flex-wrap gap-2">
                  {themes.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.name}
                        onClick={() => handleThemeChange(t.name as Theme)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          theme === t.name
                            ? 'bg-[rgb(var(--primary))] text-white'
                            : 'bg-[rgb(var(--muted))] hover:bg-[rgb(var(--muted))]/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div className="border-t border-[rgb(var(--border))] my-2" />
              <Button
                asChild
                className="w-full rounded-xl bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white"
              >
                <a href="/resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
