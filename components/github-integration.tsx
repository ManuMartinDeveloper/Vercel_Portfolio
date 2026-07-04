"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GitHubIntegration() {
  return (
    <section id="github" className="relative py-20 px-4 bg-[rgb(var(--muted))]/30 overflow-hidden">
      <div className="container max-w-3xl relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Github className="w-10 h-10 text-[rgb(var(--primary))]" />
          <h2 className="text-4xl md:text-5xl font-bold">GitHub</h2>
        </div>
        <p className="mb-8 text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
          Explore my open-source work, projects, and contributions on GitHub.
        </p>

        <Button asChild size="lg" className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/90">
          <a href="https://github.com/ManuMartinDeveloper" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 mr-2" />
            View GitHub Profile
          </a>
        </Button>
      </div>
    </section>
  )
}
