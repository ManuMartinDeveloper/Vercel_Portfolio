'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="container max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
                Hello, I'm{' '}
                <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] bg-clip-text text-transparent">
                  Manu Martin
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Software Engineer & AI Specialist | Java + Python | LLMs & Edge AI
              </p>
            </div>

            <p className="text-lg leading-relaxed text-pretty max-w-2xl">
              I&apos;m a Software Engineer and AI Specialist with hands-on experience connecting production-grade ML models to
              Java/Spring Boot and Python backends. I&apos;ve built and shipped reactive REST APIs, computer vision pipelines on
              edge hardware, and LLM-powered automation that reduced manual workload by 70&ndash;90%.
            </p>

            <p className="text-lg leading-relaxed text-pretty max-w-2xl">
              5 production AI systems shipped &bull; 90%+ manual workload automated &bull; 2 LLM assistants in active use &bull;
              Edge AI on constrained hardware. Explore my work below to see how I own full-stack features end-to-end.
            </p>

            <Button
              size="lg"
              onClick={() => scrollToSection('education')}
              className="group bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white"
            >
              Know More About Me
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative animate-fade-in-delay">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-full blur-3xl opacity-20 animate-pulse" />
              <Image
                src="/profile-hero.jpg"
                alt="Manu Martin"
                width={500}
                height={500}
                className="relative rounded-full border-4 border-[rgb(var(--primary))]/20 shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
