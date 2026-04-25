'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences = [
    {
      title: 'Freelancing',
      company: 'MR Technologies',
      period: 'May 2025 - Present',
      description: [
        'Leveraging my expertise in Human-Centric AI, NLP, and Data Science, I actively engage in freelance projects to deliver innovative and impactful solutions. My work focuses on translating complex data into actionable insights and building intelligent applications that address real-world challenges, particularly those with a social or humanitarian impact.',
      ],
      project: {
        title: 'Smart Medicine Kit with Gesture Recognition',
        details: [
          'Developed a prototype smart medicine kit that uses Computer Vision and gesture recognition to confirm patients are taking their medication. This system aims to improve medication adherence, especially for elderly patients or those requiring precise dosage monitoring, thereby enhancing patient safety and care.',
          'Implemented real-time image processing and a custom gesture classification model (e.g., using OpenCV and TensorFlow/Keras) to accurately identify medication-taking actions.',
          'Impact: Designed to provide peace of mind to caregivers and empower patients through automated, non-intrusive monitoring, demonstrating a practical application of AI on humanitarian grounds.',
        ],
      },
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
