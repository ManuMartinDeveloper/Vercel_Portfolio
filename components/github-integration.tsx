"use client"

import { Github, Star, GitFork, Code2, ArrowUpRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  contributions: number
}

export default function GitHubIntegration() {
  const stats: GitHubStats = {
    totalRepos: 11,
    totalStars: 2,
    totalForks: 0,
    contributions: 5,
  }

  const featuredRepos = [
    {
      name: "Alphonso-Content-Filter",
      description: "Android accessibility service with on-device AI for smart content filtering",
      language: "Java",
      languageColor: "#B07219",
      stars: 8,
      forks: 2,
      url: "https://github.com/ManuMartinDeveloper/alphonso",
    },
    {
      name: "Fr-Francis-Chatbot",
      description: "Catholic spiritual guidance chatbot using advanced NLP and RAG",
      language: "Python",
      languageColor: "#3572A5",
      stars: 15,
      forks: 4,
      url: "https://github.com/ManuMartinDeveloper/fr-francis",
    },
    {
      name: "Eva-Job-Agent",
      description: "Automated job seeking assistant powered by AI agents",
      language: "Python",
      languageColor: "#3572A5",
      stars: 12,
      forks: 3,
      url: "https://github.com/ManuMartinDeveloper/eva",
    },
    {
      name: "Smart-Blind-Stick",
      description: "YOLO-based object detection system for assistive technology",
      language: "Python",
      languageColor: "#3572A5",
      stars: 7,
      forks: 2,
      url: "https://github.com/ManuMartinDeveloper/smart-stick",
    },
  ]

  return (
    <section id="github" className="section-padding px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <Github className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">Open Source</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            GitHub Activity
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Explore my open-source contributions and featured repositories
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Code2, label: "Repositories", value: stats.totalRepos, color: "primary" },
            { icon: Star, label: "Stars Earned", value: stats.totalStars, color: "accent" },
            { icon: GitFork, label: "Forks", value: stats.totalForks, color: "primary" },
            { icon: Activity, label: "Contributions", value: stats.contributions, color: "accent" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-[rgb(var(--card))] rounded-2xl p-5 text-center border border-[rgb(var(--border))] shadow-sm card-hover"
              >
                <div className={`inline-flex p-3 rounded-xl mb-3 ${
                  stat.color === "accent" 
                    ? "bg-[rgb(var(--accent))]/10" 
                    : "bg-[rgb(var(--primary))]/10"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === "accent" 
                      ? "text-[rgb(var(--accent))]" 
                      : "text-[rgb(var(--primary))]"
                  }`} />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-[rgb(var(--muted-foreground))] mt-1">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Featured Repositories */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Featured Repositories</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredRepos.map((repo, index) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[rgb(var(--card))] rounded-2xl p-5 border border-[rgb(var(--border))] shadow-sm card-hover block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                    <h4 className="font-bold group-hover:text-[rgb(var(--primary))] transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[rgb(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
                  <span className="flex items-center gap-1.5">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: repo.languageColor }}
                    />
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

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white px-8"
          >
            <a href="https://github.com/ManuMartinDeveloper" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View Full Profile
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
