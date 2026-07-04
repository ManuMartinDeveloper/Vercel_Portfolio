import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Manu Martin - Software Engineer & AI Specialist',
  description: 'Portfolio of Manu Martin - Software Engineer and AI Specialist connecting production-grade ML models to Java/Spring Boot and Python backends. Reactive REST APIs, edge computer vision, and LLM-powered automation.',
  keywords: ['Software Engineer', 'AI', 'Machine Learning', 'Java', 'Spring Boot', 'Python', 'NLP', 'Computer Vision', 'LLM', 'Portfolio'],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
