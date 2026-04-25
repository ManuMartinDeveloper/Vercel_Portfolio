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
  title: 'Manu Martin | AI Technologist & Data Scientist',
  description: 'Portfolio of Manu Martin - MSc in Artificial Intelligence and Machine Learning. Specializing in Human-Centric AI, NLP, Computer Vision, and Data Science.',
  keywords: ['AI', 'Machine Learning', 'Data Science', 'NLP', 'Computer Vision', 'IoT', 'Portfolio', 'Manu Martin'],
  authors: [{ name: 'Manu Martin' }],
  creator: 'Manu Martin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Manu Martin | AI Technologist & Data Scientist',
    description: 'Portfolio showcasing AI/ML projects, data science work, and innovative solutions.',
    siteName: 'Manu Martin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manu Martin | AI Technologist & Data Scientist',
    description: 'Portfolio showcasing AI/ML projects, data science work, and innovative solutions.',
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
