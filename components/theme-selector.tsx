'use client'

import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'morning' | 'afternoon' | 'evening' | 'night' | 'auto'

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

// The theme selector is now positioned under the mat in the smart characters area
// You can delete this file or keep it as a backup

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('auto')
  const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, 'auto'>>('morning')

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && savedTheme !== 'auto') {
      setTheme(savedTheme)
      setCurrentTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      // Use time-based theme
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
      
      // Update theme every minute when in auto mode
      const interval = setInterval(() => {
        const newTimeTheme = getTimeBasedTheme()
        if (newTimeTheme !== currentTheme) {
          setCurrentTheme(newTimeTheme)
          document.documentElement.setAttribute('data-theme', newTimeTheme)
        }
      }, 60000) // Check every minute
      
      return () => clearInterval(interval)
    } else {
      setCurrentTheme(theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all"
          >
            <Palette className="h-5 w-5 text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm">
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
    </div>
  )
}
