import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Education from "@/components/education"
import Skills from "@/components/skills"
import TechStackVisualization from "@/components/tech-stack-visualization"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import GitHubIntegration from "@/components/github-integration"
import Contact from "@/components/contact"
import SmartCharacters from "@/components/smart-characters"

export default function Home() {
  return (
    <>
      <Navigation />
      <SmartCharacters />
      <main className="min-h-screen">
        <Hero />
        <Education />
        <Skills />
        <TechStackVisualization />
        <Experience />
        <Projects />
        <GitHubIntegration />
        <Contact />
      </main>
    </>
  )
}
