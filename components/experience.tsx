'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'Iolite Technologies — Bengaluru, India',
      period: 'Apr 2026 - Present',
      description: [
        'Part of the Iolite Technologies & Christ University ecosystem, building production software that replaces manual institutional workflows with modern, reactive systems.',
      ],
      responsibilities: [
        'Co-built the EREC Service module using Java, Spring Boot, and Spring WebFlux — replacing a manual paper-based ethics-clearance workflow used across Christ University campuses, cutting average approval time from ~5 days to same-day for most submissions.',
        'Developed non-blocking reactive REST APIs (WebClient) to handle concurrent research submission spikes without degrading response times.',
        'Built the Reviewer Pool Setup UI in React.js + Material-UI, giving admins dynamic workload controls that kept SLA breaches at zero across the first two submission windows.',
        'Integrated a Python generative AI microservice for automatic PDF parsing, questionnaire pre-population, and checklist compliance checks — removing ~3 hours of per-submission manual review.',
        'Ran pair-programming sessions for two junior developers transitioning to reactive programming and LLM integrations, reducing their ramp-up time by roughly half.',
      ],
    },
    {
      title: 'AI Developer',
      company: 'Christ University Contract — Bengaluru, India',
      period: 'Jan 2026 - Apr 2026',
      description: [
        'Contracted to automate university operations with practical, production-grade AI tooling built around fine-tuned ML models and GPT-based LLMs.',
      ],
      responsibilities: [
        'Automated repetitive ERP data-entry workflows using fine-tuned ML models on custom university datasets, reducing required manual intervention by over 90%.',
        'Designed and optimised prompt structures for GPT-based LLMs to deliver contextually accurate outputs within the university\u2019s compliance domain.',
        'Led internal tech discussions and pair-programming sessions on LLM alignment and prompt engineering to upskill peers on practical AI tooling.',
      ],
    },
    {
      title: 'Freelance AI Technologist & Data Scientist',
      company: 'Self-employed',
      period: 'May 2025 - Jan 2026',
      description: [
        'Delivered end-to-end AI solutions for multiple clients — from computer vision on edge hardware to NLP applications — owning data cleaning, model development, optimisation, and deployment.',
      ],
      responsibilities: [
        'Built a vision-based assistive medication-compliance system using OpenCV and ONNX, deployed to a Raspberry Pi; achieved real-time inference at <200 ms per frame for a high-risk patient pilot.',
        'Designed and optimised image-processing pipelines for edge gesture-classification models, keeping CPU utilisation under 40% on constrained hardware.',
        'Delivered NLP-focused AI applications for multiple clients, covering data cleaning, feature extraction, and model deployment.',
      ],
    },
    {
      title: 'Conversation Designer Intern',
      company: 'Comportement Software Pvt Ltd',
      period: 'Jan 2025 - May 2025',
      description: [
        'Contributed to the development of user-centric conversational AI experiences for tier-1 clients, applying design principles to enhance user interaction and understanding.',
      ],
      responsibilities: [
        'Designed dialogue trees and conversational scripts for tier-1 clients Dream11 and ICICI, collaborating directly with senior engineers.',
        'Ran UAT sessions to identify response-clarity gaps, iterating scripts until error rates dropped to acceptable thresholds.',
        'Gained hands-on experience with industry-standard conversation design platforms and prototyping tools such as Google Dialogflow, Figma, Lucid, and Haptic.',
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
