"use client"

import { useState } from "react"
import { Github, Star, GitFork, Calendar, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  contributions: number
}

export default function GitHubIntegration() {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 11,
    totalStars: 2,
    totalForks: 0,
    contributions: 5,
  })

  const featuredRepos = [
    {
      name: "Alphonso-Content-Filter",
      description: "Android accessibility service with on-device AI for smart content filtering",
      language: "Java",
      stars: 8,
      forks: 2,
      url: "https://github.com/ManuMartinDeveloper/alphonso",
    },
    {
      name: "Fr-Francis-Chatbot",
      description: "Catholic spiritual guidance chatbot using advanced NLP and RAG",
      language: "Python",
      stars: 15,
      forks: 4,
      url: "https://github.com/ManuMartinDeveloper/fr-francis",
    },
    {
      name: "Eva-Job-Agent",
      description: "Automated job seeking assistant powered by AI agents",
      language: "Python",
      stars: 12,
      forks: 3,
      url: "https://github.com/ManuMartinDeveloper/eva",
    },
    {
      name: "Smart-Blind-Stick",
      description: "YOLO-based object detection system for assistive technology",
      language: "Python",
      stars: 7,
      forks: 2,
      url: "https://github.com/ManuMartinDeveloper/smart-stick",
    },
  ]

  return (
    <section id="github" className="relative py-20 px-4 bg-[rgb(var(--muted))]/30 overflow-hidden">
      <div className="container max-w-7xl relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Github className="w-10 h-10 text-[rgb(var(--primary))]" />
          <h2 className="text-4xl md:text-5xl font-bold text-center">GitHub Activity</h2>
        </div>
        <p className="text-center mb-12 text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
          Explore my open-source contributions and featured projects
        </p>

        {/* GitHub Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 text-center shadow-lg border border-[rgb(var(--primary))]/10">
            <Code2 className="w-8 h-8 mx-auto mb-2 text-[rgb(var(--primary))]" />
            <div className="text-3xl font-bold mb-1">{stats.totalRepos}</div>
            <div className="text-sm text-[rgb(var(--muted-foreground))]">Repositories</div>
          </div>
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 text-center shadow-lg border border-[rgb(var(--primary))]/10">
            <Star className="w-8 h-8 mx-auto mb-2 text-[rgb(var(--accent))]" />
            <div className="text-3xl font-bold mb-1">{stats.totalStars}</div>
            <div className="text-sm text-[rgb(var(--muted-foreground))]">Stars</div>
          </div>
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 text-center shadow-lg border border-[rgb(var(--primary))]/10">
            <GitFork className="w-8 h-8 mx-auto mb-2 text-[rgb(var(--primary))]" />
            <div className="text-3xl font-bold mb-1">{stats.totalForks}</div>
            <div className="text-sm text-[rgb(var(--muted-foreground))]">Forks</div>
          </div>
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 text-center shadow-lg border border-[rgb(var(--primary))]/10">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-[rgb(var(--accent))]" />
            <div className="text-3xl font-bold mb-1">{stats.contributions}</div>
            <div className="text-sm text-[rgb(var(--muted-foreground))]">Contributions</div>
          </div>
        </div>

        {/* Featured Repositories */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Repositories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredRepos.map((repo, index) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[rgb(var(--card))] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[rgb(var(--primary))]/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold group-hover:text-[rgb(var(--primary))] transition-colors">
                    {repo.name}
                  </h4>
                  <Github className="w-5 h-5 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] transition-colors" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed">{repo.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[rgb(var(--primary))]" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/90">
            <a href="https://github.com/ManuMartinDeveloper" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View Full GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
