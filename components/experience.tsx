'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'Iolite Technologies',
      period: 'Apr 2026 - Present',
      description: [
        'Contributing to the design, development, and delivery of production software within the Iolite Technologies & Christ University ecosystem in Bengaluru, working across Java/Spring Boot backends and React frontends.',
      ],
      responsibilities: [
        'Designed and developed the EREC Service module in Java, Spring Boot, and Spring WebFlux — analysed requirements with stakeholders, wrote non-blocking REST APIs, and delivered tested, documented code that replaced a manual workflow across multiple university campuses.',
        'Participated in code reviews with senior engineers, applying and giving structured feedback to improve consistency and quality across the shared codebase.',
        'Built the Reviewer Pool Setup UI in React.js + Material-UI to specification, coordinating with product stakeholders to ensure the frontend met operational requirements before release.',
        'Integrated a Python generative AI microservice for PDF parsing and compliance checks — wrote unit tests, supported QA, and documented the integration for team handover.',
        'Contributed to Agile ceremonies including sprint planning and retrospectives, and maintained technical documentation throughout each delivery cycle.',
      ],
    },
    {
      title: 'Software Developer (Contract)',
      company: 'Christ University',
      period: 'Jan 2026 - Apr 2026',
      description: [
        'Delivered Python-based ML and LLM integrations within an existing ERP platform, owning each feature from requirement analysis through to production deployment.',
      ],
      responsibilities: [
        'Developed Python-based ML integrations within an existing ERP platform, automating data-entry workflows and reducing manual processing by over 90% — owned the full cycle from requirement analysis to production deployment.',
        'Designed and tested prompt structures for GPT-based LLM APIs, iterating based on output quality and stakeholder feedback.',
        'Maintained version-controlled codebases using Git throughout, with clear commit history and branch management practices.',
        'Applied rapid prototyping (vibe coding) to quickly develop, test, and iterate on core AI features based on user feedback — compressing development cycles significantly.',
        'Delivered internal knowledge-sharing sessions on LLM tooling, AI-assisted development, and prompt engineering to upskill team members.',
      ],
    },
    {
      title: 'Freelance Software Developer',
      company: 'Self-employed',
      period: 'May 2025 - Jan 2026',
      description: [
        'Delivered end-to-end Python, computer-vision, and NLP applications for multiple clients, taking each project from requirements through to a tested, deployed solution.',
      ],
      responsibilities: [
        'Built and deployed a Python + OpenCV + ONNX real-time inference application on Raspberry Pi (<200 ms per frame), and delivered NLP-focused applications for multiple clients end-to-end.',
        'Designed image-processing pipelines for edge gesture-classification models, optimising CPU utilisation on constrained hardware.',
      ],
    },
    {
      title: 'Conversation Designer Intern',
      company: 'Comportement Software Pvt Ltd',
      period: 'Jan 2025 - May 2025',
      description: [
        'During my 4-month internship at Comportement, I actively contributed to the development of user-centric conversational AI experiences, applying design principles to enhance user interaction and understanding. This role significantly deepened my practical skills in crafting intuitive dialogue systems.',
      ],
      responsibilities: [
        'Designed and Mapped Dialogue Flows: Collaborated with senior designers and AI engineers to create comprehensive dialogue trees and conversational scripts for their clients like Dreams11, ICICI and others.',
        'Crafted Conversational Persona & Tone: Contributed to defining and maintaining a consistent, user-friendly conversational persona that aligned with project goals, ensuring empathetic and clear communication.',
        'Assisted in User Testing & Iteration: Participated in user acceptance testing sessions, gathered feedback, and iterated on conversational designs to optimize clarity, usability, and user satisfaction.',
        'Utilized Key Tools: Gained hands-on experience with industry-standard conversation design platforms and prototyping tools such as Google Dialogflow, Figma, Lucid, Haptic.',
        'Learned Practical Deployment: Understood the end-to-end process from design to basic integration with backend systems, enhancing my comprehension of the AI pipeline.',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Experience
        </h2>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[rgb(var(--card))] rounded-2xl shadow-lg border border-[rgb(var(--primary))]/10 overflow-hidden"
            >
              <Button
                variant="ghost"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between hover:bg-[rgb(var(--muted))]/50 transition-colors h-auto"
              >
                <div className="flex items-start gap-4 text-left flex-1">
                  <div className="p-3 bg-[rgb(var(--primary))]/10 rounded-lg flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-[rgb(var(--primary))] font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              {expandedIndex === index && (
                <div className="px-6 pb-6 space-y-4 animate-fade-in">
                  {exp.description.map((desc, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      {desc}
                    </p>
                  ))}

                  {exp.project && (
                    <div className="mt-4 p-4 bg-[rgb(var(--muted))]/30 rounded-lg">
                      <h4 className="font-semibold text-[rgb(var(--accent))] mb-2">
                        Major Key Project: {exp.project.title}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {exp.project.details.map((detail, i) => (
                          <li key={i} className="leading-relaxed">• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.responsibilities && (
                    <ul className="space-y-2 text-sm mt-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="leading-relaxed">• {resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
