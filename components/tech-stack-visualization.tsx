"use client"

import { useState } from "react"
import { Brain, Code, Database, Cloud, Laptop, Wrench, Layers } from "lucide-react"

export default function TechStackVisualization() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const techStack = [
    {
      category: "AI/ML",
      icon: Brain,
      colorClass: "primary",
      proficiency: 90,
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "LangChain", "YOLO", "ONNX"],
    },
    {
      category: "Programming",
      icon: Code,
      colorClass: "accent",
      proficiency: 85,
      technologies: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL"],
    },
    {
      category: "Web Development",
      icon: Laptop,
      colorClass: "primary",
      proficiency: 80,
      technologies: ["React", "Next.js", "Flask", "FastAPI", "Streamlit", "Tailwind CSS"],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      colorClass: "accent",
      proficiency: 75,
      technologies: ["AWS", "Docker", "Linux", "OpenVPN", "Firebase"],
    },
    {
      category: "Databases",
      icon: Database,
      colorClass: "primary",
      proficiency: 70,
      technologies: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      category: "Tools & Others",
      icon: Wrench,
      colorClass: "accent",
      proficiency: 85,
      technologies: ["Git", "Power BI", "Tableau", "Raspberry Pi", "OpenCV"],
    },
  ]

  return (
    <section id="tech-stack" className="section-padding px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <Layers className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Interactive visualization of my technical expertise across different domains
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredCategory === item.category
            const isPrimary = item.colorClass === "primary"

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCategory(item.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="bg-[rgb(var(--card))] rounded-2xl p-6 border border-[rgb(var(--border))] shadow-sm card-hover cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-3 rounded-xl transition-all ${
                    isHovered 
                      ? isPrimary 
                        ? "bg-[rgb(var(--primary))]" 
                        : "bg-[rgb(var(--accent))]"
                      : isPrimary
                        ? "bg-[rgb(var(--primary))]/10"
                        : "bg-[rgb(var(--accent))]/10"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isHovered 
                        ? "text-white" 
                        : isPrimary 
                          ? "text-[rgb(var(--primary))]" 
                          : "text-[rgb(var(--accent))]"
                    }`} />
                  </div>
                  <h3 className="text-lg font-bold">{item.category}</h3>
                </div>

                {/* Proficiency Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[rgb(var(--muted-foreground))]">Proficiency</span>
                    <span className={`font-semibold ${
                      isPrimary 
                        ? "text-[rgb(var(--primary))]" 
                        : "text-[rgb(var(--accent))]"
                    }`}>
                      {item.proficiency}%
                    </span>
                  </div>
                  <div className="h-2 bg-[rgb(var(--muted))] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isPrimary 
                          ? "bg-[rgb(var(--primary))]" 
                          : "bg-[rgb(var(--accent))]"
                      }`}
                      style={{
                        width: isHovered ? `${item.proficiency}%` : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                          isHovered
                            ? isPrimary
                              ? "bg-[rgb(var(--primary))]/20 text-[rgb(var(--primary))]"
                              : "bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))]"
                            : "bg-[rgb(var(--muted))]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
