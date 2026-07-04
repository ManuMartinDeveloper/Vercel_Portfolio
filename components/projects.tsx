"use client"

import { useState } from "react"
import { ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PDFViewer from "./pdf-viewer"

export default function Projects() {
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const projects = [
    {
      title: "Research Ethical Clearance Portal (EREC)",
      description:
        "Full-stack automated clearance engine (Spring WebFlux + React) in active institutional use at Christ University. Auto-generates secure PDF certificates on final validation and enforces multi-stage compliance workflows, cutting average approval time from ~5 days to same-day.",
      tech: ["Java", "Spring Boot", "Spring WebFlux", "React.js", "Material-UI", "Python", "GenAI"],
      link: "https://github.com/ManuMartinDeveloper",
      image: "/projects/erec-ethics-portal.png",
      category: "AI/ML",
    },
    {
      title: "My Online Portfolio",
      description:
        "An interactive platform showcasing my expertise, projects, and professional journey in AI and Data Science. Built with Next.js, this portfolio demonstrates my skills in creating user-friendly interfaces and dynamic web content with time-based theme switching and animated interactions.",
      note: "You're looking at it! This is my portfolio project in action.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      image: "/projects/modern-portfolio-website.jpg",
      category: "Web Development",
    },
    {
      title: "Alphonso - On-Device AI Content Filter",
      description:
        "An Android accessibility service using on-device AI to screen content in real-time. Migrated the detection model from NudeNet 320n to YOLOv8, cutting inference latency by ~60% while keeping all processing on-device for privacy. Added Isolation Forest anomaly detection for smart lockdown of unusual usage patterns without cloud dependency.",
      tech: ["Android", "YOLOv8", "ONNX Runtime", "Isolation Forest", "Firebase", "Accessibility Services"],
      link: "https://github.com/ManuMartinDeveloper/Alphonso",
      image: "/projects/alphonso-content-filter.jpg",
      category: "AI/ML",
    },
    {
      title: "Fr. Francis: Catholic Priest AI Chatbot",
      description:
        "A Streamlit assistant built on LangChain with multi-source RAG over the Groq API, delivering sub-second theological query responses across a 50k+ document corpus. Simulates a chatbot capable of responding with the wisdom and compassion of a Catholic priest.",
      tech: ["Python", "Streamlit", "Transformers", "LangChain", "RAG", "Groq API"],
      link: "https://aiofgod.streamlit.app",
      image: "/projects/spiritual-chatbot-interface.jpg",
      category: "AI/ML",
    },
    {
      title: "Eva - Automated Job-Seeking Assistant",
      description:
        "A multi-agent pipeline that scans job boards, scores listings against a resume, and logs pipeline state automatically — reducing manual tracking overhead by 70%. Built with natural language processing and machine learning for efficient, hands-off job hunting.",
      tech: ["Python", "Multi-Agent Systems", "NLP", "Automation", "LangChain"],
      link: "https://github.com/ManuMartinDeveloper/Eva-AI-Job-Butler",
      image: "/projects/job-search-ai-assistant.jpg",
      category: "AI/ML",
    },
    {
      title: "Tessa - Travel AI Agent",
      description:
        "A smart travel companion that provides personalized travel recommendations, itinerary planning, and real-time assistance using AI to create memorable travel experiences tailored to user preferences.",
      tech: ["Python", "AI Agents", "NLP", "RAG", "APIs"],
      image: "/projects/travel-planning-ai-interface.jpg",
      category: "AI/ML",
    },
    {
      title: "Smart Blind Stick - YOLO + Raspberry Pi",
      description:
        "Embedded YOLOv5 object-detection on Raspberry Pi with an audio feedback loop; processes spatial hazards in real time to assist visually impaired navigation, integrating computer vision with IoT for assistive technology.",
      tech: ["Python", "Computer Vision", "YOLOv5", "Raspberry Pi", "OpenCV"],
      image: "/projects/smart-blind-stick-device.jpg",
      category: "IoT",
    },
    {
      title: "Private VPN on AWS",
      description:
        "Setup a secure Virtual Private Network using AWS services to ensure private internet access. Configured using OpenVPN on EC2 instances with proper security groups and VPC configuration for enhanced online privacy.",
      tech: ["AWS", "OpenVPN", "Linux", "Cloud Security", "EC2"],
      image: "/projects/vpn-cloud-security.jpg",
      category: "Cloud & DevOps",
    },
    {
      title: "Private Server Cloud Deployment",
      description:
        "Setup a private cloud server using Nextcloud on an old i3 processor laptop with Ubuntu Server. Demonstrates feasibility of using low-cost hardware for personal cloud services, providing secure file storage and management.",
      tech: ["Nextcloud", "Ubuntu Server", "Linux", "Self-Hosting"],
      image: "/projects/private-cloud-storage.jpg",
      category: "Cloud & DevOps",
    },
    {
      title: "Analysis of Developmental Crisis Dashboard",
      description:
        "A comprehensive Power BI dashboard that visualizes the impact of developmental crises and social support across different genders. Features interactive charts and detailed analysis of how social support affects individuals during developmental challenges.",
      tech: ["Power BI", "Data Visualization", "Data Analysis", "Excel"],
      image: "/projects/data-analysis-dashboard.jpg",
      hasPDF: true,
      category: "Data Analytics",
    },
    {
      title: "PDF Merger Application",
      description:
        "A simple Python application that merges multiple PDF files into a single document. Built with Streamlit and pypdf library, focusing on efficient document management with user-friendly interface for file ordering.",
      tech: ["Python", "Streamlit", "pypdf", "Document Processing"],
      link: "https://manu-pdfmerger.streamlit.app",
      image: "/projects/pdf-merger-application.jpg",
      category: "Web Development",
    },
  ]

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <>
      <section id="projects" className="relative py-20 px-4 bg-[rgb(var(--muted))]/30 overflow-hidden">
        <div className="container max-w-7xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Key Projects</h2>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`
                  transition-all
                  ${
                    selectedCategory === category
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                      : "border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40"
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-[rgb(var(--card))] rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[rgb(var(--primary))]/10 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-[rgb(var(--muted))]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-balance">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-pretty">{project.description}</p>
                    {project.note && (
                      <p className="text-sm font-medium text-[rgb(var(--accent))] mt-2">{project.note}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.hasPDF && (
                    <Button
                      onClick={() => setIsPDFOpen(true)}
                      variant="outline"
                      className="w-full group/btn border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  )}

                  {project.link && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group/btn border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40 bg-transparent"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        {project.link.includes("github.com") ? "View on GitHub" : "View Live Demo"}
                      </a>
                    </Button>
                  )}
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
