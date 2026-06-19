import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Manu Martin | Software Engineer & AI Specialist',
  description: 'Portfolio of Manu Martin - Software Engineer and AI Specialist based in Australia with full work rights. Java/Spring Boot, Python backends, computer vision, and LLM-powered automation.',
  keywords: ['Software Engineer', 'AI Specialist', 'Java', 'Spring Boot', 'Python', 'Machine Learning', 'NLP', 'Computer Vision', 'Australia', 'Portfolio', 'Manu Martin'],
  authors: [{ name: 'Manu Martin' }],
  creator: 'Manu Martin',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    title: 'Manu Martin | Software Engineer & AI Specialist',
    description: 'Software Engineer and AI Specialist based in Australia. Building reactive backends, computer vision pipelines, and LLM-powered automation.',
    siteName: 'Manu Martin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manu Martin | Software Engineer & AI Specialist',
    description: 'Software Engineer and AI Specialist based in Australia. Building reactive backends, computer vision pipelines, and LLM-powered automation.',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFAF5' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
