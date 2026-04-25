"use client"

import { useState } from "react"
import { ExternalLink, FileText, Folder, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PDFViewer from "./pdf-viewer"

export default function Projects() {
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const projects = [
    {
      title: "My Online Portfolio",
      description:
        "An interactive platform showcasing my expertise, projects, and professional journey in AI and Data Science. Built with Next.js featuring time-based theme switching and animated interactions.",
      note: "You&apos;re looking at it! This is my portfolio project in action.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      image: "/projects/modern-portfolio-website.jpg",
      category: "Web Development",
      featured: true,
    },
    {
      title: "Alphonso - Smart Content Filter",
      description:
        "An Android accessibility service using on-device AI to analyze screen content in real-time for sensitive imagery. Features smart strike system, lockdown mechanisms, and privacy-focused local processing.",
      tech: ["Android", "AI/ML", "ONNX Runtime", "Firebase", "NudeNet"],
      image: "/projects/alphonso-content-filter.jpg",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Fr. Francis: Catholic Priest Chatbot",
      description:
        "A Streamlit application simulating a chatbot that responds with the wisdom and compassion of a Catholic priest using advanced NLP and LLMs for spiritual guidance.",
      tech: ["Python", "Streamlit", "LangChain", "RAG", "Groq API"],
      link: "https://aiofgod.streamlit.app",
      image: "/projects/spiritual-chatbot-interface.jpg",
      category: "AI/ML",
    },
    {
      title: "Eva - Automated Job Seeking Assistant",
      description:
        "An intelligent AI agent that automates job search, helping users find opportunities, optimize resumes, and manage applications efficiently.",
      tech: ["Python", "NLP", "AI Agents", "LangChain"],
      image: "/projects/job-search-ai-assistant.jpg",
      category: "AI/ML",
    },
    {
      title: "Tessa - Travel AI Agent",
      description:
        "A smart travel companion providing personalized recommendations, itinerary planning, and real-time assistance using AI.",
      tech: ["Python", "AI Agents", "NLP", "RAG"],
      image: "/projects/travel-planning-ai-interface.jpg",
      category: "AI/ML",
    },
    {
      title: "Smart Blind Stick using YOLO",
      description:
        "A prototype using YOLO for real-time object detection on Raspberry Pi, assisting visually impaired individuals with audio feedback.",
      tech: ["Python", "YOLO", "Raspberry Pi", "OpenCV"],
      image: "/projects/smart-blind-stick-device.jpg",
      category: "IoT",
    },
    {
      title: "Private VPN on AWS",
      description:
        "Secure Virtual Private Network using AWS services with OpenVPN on EC2 instances for enhanced online privacy.",
      tech: ["AWS", "OpenVPN", "Linux", "Cloud Security"],
      image: "/projects/vpn-cloud-security.jpg",
      category: "Cloud & DevOps",
    },
    {
      title: "Private Server Cloud Deployment",
      description:
        "Private cloud server using Nextcloud on repurposed hardware with Ubuntu Server for secure file storage and management.",
      tech: ["Nextcloud", "Ubuntu Server", "Linux", "Self-Hosting"],
      image: "/projects/private-cloud-storage.jpg",
      category: "Cloud & DevOps",
    },
    {
      title: "Developmental Crisis Dashboard",
      description:
        "A comprehensive Power BI dashboard visualizing the impact of developmental crises and social support across demographics.",
      tech: ["Power BI", "Data Visualization", "Data Analysis"],
      image: "/projects/data-analysis-dashboard.jpg",
      hasPDF: true,
      category: "Data Analytics",
    },
    {
      title: "PDF Merger Application",
      description:
        "A Python application that merges multiple PDF files into a single document with a user-friendly interface.",
      tech: ["Python", "Streamlit", "pypdf"],
      link: "https://manu-pdfmerger.streamlit.app",
      image: "/projects/pdf-merger-application.jpg",
      category: "Web Development",
    },
  ]

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)
  const featuredProjects = projects.filter(p => p.featured)

  return (
    <>
      <section id="projects" className="section-padding px-6 bg-[rgb(var(--muted))]/30">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
              <Folder className="w-4 h-4 text-[rgb(var(--primary))]" />
              <span className="text-sm font-medium text-[rgb(var(--primary))]">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in AI, web development, and data science
            </p>
          </div>

          {/* Featured Projects - Large Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden shadow-sm card-hover"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[rgb(var(--muted))]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-[rgb(var(--primary))] text-white">
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-medium text-[rgb(var(--accent))] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-balance">{project.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--muted))] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--muted))] font-medium">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-[rgb(var(--primary))] text-white"
                    : "bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.filter(p => !p.featured).map((project, index) => (
              <div
                key={index}
                className="group bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden shadow-sm card-hover"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-[rgb(var(--muted))]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs font-medium text-[rgb(var(--accent))] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-2 text-balance">{project.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--muted))] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    {project.hasPDF && (
                      <Button
                        onClick={() => setIsPDFOpen(true)}
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]"
                      >
                        <FileText className="w-4 h-4 mr-1.5" />
                        Report
                      </Button>
                    )}
                    {project.link && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          Demo
                          <ArrowUpRight className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PDFViewer isOpen={isPDFOpen} onClose={() => setIsPDFOpen(false)} />
    </>
  )
}
