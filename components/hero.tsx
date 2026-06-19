'use client'

import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-background opacity-50" />
      
      {/* Gradient orbs - decorative */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[rgb(var(--primary))] rounded-full blur-[128px] opacity-20" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[rgb(var(--accent))] rounded-full blur-[128px] opacity-15" />

      <div className="container max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20">
              <Sparkles className="w-4 h-4 text-[rgb(var(--primary))]" />
              <span className="text-sm font-medium text-[rgb(var(--primary))]">
                Based in Australia &middot; Full Work Rights
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] bg-clip-text text-transparent">
                Manu Martin
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] font-medium">
              Software Engineer & AI Specialist
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed text-pretty max-w-xl mx-auto lg:mx-0 text-[rgb(var(--muted-foreground))]">
              I connect production-grade ML models to Java/Spring Boot and Python backends, 
              shipping reactive REST APIs, computer vision pipelines on edge hardware, and 
              LLM-powered automation that cuts manual workload by 70&ndash;90%.
            </p>

            {/* Visa Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgb(var(--accent))]/10 border border-[rgb(var(--accent))]/20">
              <span className="text-sm font-medium text-[rgb(var(--accent))]">
                Visa: MATES (Subclass 403) &mdash; Unrestricted Work Rights, 2 Years
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto rounded-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white px-8 group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto rounded-full border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/5 px-8"
              >
                Get in Touch
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-[rgb(var(--border))]">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[rgb(var(--primary))]">10+</p>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[rgb(var(--primary))]">2+</p>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Years Exp.</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[rgb(var(--primary))]">MSc</p>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">AI/ML</p>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-2xl blur-2xl opacity-30 animate-pulse" />
              
              {/* Image container - rounded rectangle */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-[rgb(var(--card))] shadow-lg">
                <Image
                  src="/profile-hero.jpg"
                  alt="Manu Martin"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-[rgb(var(--muted-foreground))]">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
        </div>
      </div>
    </section>
  )
}
