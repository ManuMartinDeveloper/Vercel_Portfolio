'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown, Calendar, Building2, Rocket, CheckCircle2 } from 'lucide-react'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences = [
    {
      title: 'Freelance AI Consultant',
      company: 'MR Technologies',
      period: 'May 2025 - Present',
      type: 'Self-employed',
      description: 'Leveraging expertise in Human-Centric AI, NLP, and Data Science to deliver innovative solutions for real-world challenges with social impact.',
      project: {
        title: 'Smart Medicine Kit with Gesture Recognition',
        details: [
          'Developed prototype smart medicine kit using Computer Vision and gesture recognition',
          'Implemented real-time image processing with OpenCV and TensorFlow/Keras',
          'Designed for elderly patients to improve medication adherence and safety',
          'Created non-intrusive monitoring system for caregivers',
        ],
      },
      skills: ['Computer Vision', 'TensorFlow', 'OpenCV', 'IoT', 'Python'],
    },
    {
      title: 'Conversation Designer Intern',
      company: 'Comportement Software Pvt Ltd',
      period: 'Jan 2025 - May 2025',
      type: 'Internship',
      description: 'Contributed to user-centric conversational AI experiences, enhancing user interaction and understanding through thoughtful dialogue design.',
      responsibilities: [
        'Designed dialogue flows and conversational scripts for clients like Dream11 and ICICI',
        'Defined and maintained consistent conversational personas',
        'Participated in user acceptance testing and iteration cycles',
        'Gained experience with Dialogflow, Figma, Lucid, and Haptic',
        'Learned end-to-end deployment from design to backend integration',
      ],
      skills: ['Dialogflow', 'UX Design', 'NLP', 'Figma', 'User Research'],
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
