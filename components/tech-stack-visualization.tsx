"use client"

import { useState } from "react"
import { Brain, Code, Database, Cloud, Laptop, Wrench } from "lucide-react"

export default function TechStackVisualization() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const techStack = [
    {
      category: "AI/ML",
      icon: Brain,
      color: "rgb(var(--primary))",
      proficiency: 90,
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "LangChain", "YOLO", "ONNX"],
    },
    {
      category: "Programming",
      icon: Code,
      color: "rgb(var(--accent))",
      proficiency: 85,
      technologies: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL"],
    },
    {
      category: "Web Development",
      icon: Laptop,
      color: "rgb(var(--primary))",
      proficiency: 80,
      technologies: ["React", "Next.js", "Flask", "FastAPI", "Streamlit", "Tailwind CSS"],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "rgb(var(--accent))",
      proficiency: 75,
      technologies: ["AWS", "Docker", "Linux", "OpenVPN", "Firebase"],
    },
    {
      category: "Databases",
      icon: Database,
      color: "rgb(var(--primary))",
      proficiency: 70,
      technologies: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      category: "Tools & Others",
      icon: Wrench,
      color: "rgb(var(--accent))",
      proficiency: 85,
      technologies: ["Git", "Power BI", "Tableau", "Raspberry Pi", "OpenCV"],
    },
  ]

  return (
    <section id="tech-stack" className="relative py-20 px-4 overflow-hidden">
      <div className="container max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Tech Stack</h2>
        <p className="text-center mb-12 text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
          Interactive visualization of my technical expertise across different domains
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredCategory === item.category

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCategory(item.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="bg-[rgb(var(--card))] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[rgb(var(--primary))]/10 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: isHovered ? item.color : `${item.color}15`,
                    }}
                  >
                    <Icon className="w-6 h-6 transition-all" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold">{item.category}</h3>
                </div>

                {/* Proficiency Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[rgb(var(--muted-foreground))]">Proficiency</span>
                    <span className="font-semibold" style={{ color: item.color }}>
                      {item.proficiency}%
                    </span>
                  </div>
                  <div className="h-2 bg-[rgb(var(--muted))] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isHovered ? `${item.proficiency}%` : "0%",
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>

                {/* Technologies List */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wide">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-md font-medium transition-all"
                        style={{
                          backgroundColor: isHovered ? `${item.color}20` : `${item.color}10`,
                          color: item.color,
                        }}
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
