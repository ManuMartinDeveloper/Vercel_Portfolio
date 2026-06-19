'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown, Calendar, Building2, Rocket, CheckCircle2 } from 'lucide-react'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'Iolite Technologies',
      period: 'Apr 2026 - Present',
      type: 'Full-time',
      description: 'Building production-grade reactive backends and full-stack features within the Christ University ecosystem in Bengaluru, India.',
      responsibilities: [
        'Co-built the EREC Service module using Java, Spring Boot, and Spring WebFlux — replacing a manual paper-based ethics-clearance workflow and cutting average approval time from ~5 days to same-day for most submissions',
        'Developed non-blocking reactive REST APIs (WebClient) to handle concurrent research submission spikes without degrading response times',
        'Built the Reviewer Pool Setup UI in React.js + Material-UI, giving admins dynamic workload controls that kept SLA breaches at zero across the first two submission windows',
        'Integrated a Python generative AI microservice for automatic PDF parsing, questionnaire pre-population, and checklist compliance checks — removing ~3 hours of per-submission manual review',
        'Ran pair-programming sessions for two junior developers transitioning to reactive programming and LLM integrations, reducing their ramp-up time by roughly half',
      ],
      skills: ['Java', 'Spring Boot', 'Spring WebFlux', 'React.js', 'Material-UI', 'Python'],
    },
    {
      title: 'AI Developer',
      company: 'Christ University (Contract)',
      period: 'Jan 2026 - Apr 2026',
      type: 'Contract',
      description: 'Automated university ERP workflows with fine-tuned ML models and LLM-based tooling within a strict compliance domain.',
      responsibilities: [
        'Automated repetitive ERP data-entry workflows using fine-tuned ML models on custom university datasets, reducing required manual intervention by over 90%',
        'Designed and optimised prompt structures for GPT-based LLMs to deliver contextually accurate outputs within the university\'s compliance domain',
        'Led internal tech discussions and pair-programming sessions on LLM alignment and prompt engineering to upskill peers on practical AI tooling',
      ],
      skills: ['Python', 'LLMs', 'Prompt Engineering', 'Fine-tuning', 'ML'],
    },
    {
      title: 'Freelance AI Technologist & Data Scientist',
      company: 'MR Technologies (Remote)',
      period: 'May 2025 - Jan 2026',
      type: 'Self-employed',
      description: 'Delivered computer vision systems on edge hardware and NLP-focused AI applications for multiple clients.',
      project: {
        title: 'Vision-Based Assistive Medication-Compliance System',
        details: [
          'Built a vision-based assistive medication-compliance system using OpenCV and ONNX, deployed to a Raspberry Pi; achieved real-time inference at <200 ms per frame for a high-risk patient pilot',
          'Designed and optimised image-processing pipelines for edge gesture-classification models, keeping CPU utilisation under 40% on constrained hardware',
          'Delivered NLP-focused AI applications for multiple clients, covering data cleaning, feature extraction, and model deployment',
        ],
      },
      skills: ['OpenCV', 'ONNX', 'Raspberry Pi', 'Edge AI', 'Python', 'NLP'],
    },
    {
      title: 'Conversation Designer Intern',
      company: 'Comportement Software Pvt Ltd (Remote)',
      period: 'Jan 2025 - May 2025',
      type: 'Internship',
      description: 'Designed conversational experiences for tier-1 clients, collaborating directly with senior engineers.',
      responsibilities: [
        'Designed dialogue trees and conversational scripts for tier-1 clients Dream11 and ICICI, collaborating directly with senior engineers',
        'Ran UAT sessions to identify response-clarity gaps, iterating scripts until error rates dropped to acceptable thresholds',
      ],
      skills: ['Dialogflow', 'UX Design', 'NLP', 'Conversation Design', 'UAT'],
    },
  ]

  return (
    <section id="experience" className="section-padding px-6">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <Briefcase className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Experience
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Building real-world AI solutions and learning from industry leaders
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden shadow-sm transition-all duration-300"
            >
              {/* Header - Always visible */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-6 flex items-start gap-4 text-left hover:bg-[rgb(var(--muted))]/30 transition-colors"
              >
                {/* Icon */}
                <div className="flex-shrink-0 p-3 rounded-xl bg-[rgb(var(--primary))]/10">
                  <Briefcase className="w-6 h-6 text-[rgb(var(--primary))]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-[rgb(var(--primary))]">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] font-medium">
                    {exp.type}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="flex-shrink-0">
                  <ChevronDown
                    className={`w-5 h-5 text-[rgb(var(--muted-foreground))] transition-transform duration-300 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="px-6 pb-6 space-y-6 animate-fade-in border-t border-[rgb(var(--border))]">
                  <div className="pt-6">
                    {/* Description */}
                    <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Project */}
                    {exp.project && (
                      <div className="mt-6 p-4 rounded-xl bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))]">
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-[rgb(var(--accent))]" />
                          <h4 className="font-semibold text-[rgb(var(--accent))]">
                            Key Project: {exp.project.title}
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {exp.project.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-[rgb(var(--primary))] mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Responsibilities */}
                    {exp.responsibilities && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgb(var(--muted-foreground))] mb-3">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-[rgb(var(--primary))] mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgb(var(--muted-foreground))] mb-3">
                        Skills Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-sm px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
