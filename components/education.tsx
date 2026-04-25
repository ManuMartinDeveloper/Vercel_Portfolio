'use client'

import { GraduationCap, Calendar, MapPin, BookOpen, Award } from 'lucide-react'

export default function Education() {
  const education = [
    {
      degree: 'MSc in Artificial Intelligence and Machine Learning',
      institution: 'Christ Deemed To Be University',
      location: 'Bengaluru, India',
      period: '2023 - 2025',
      coursework: [
        'Machine Learning',
        'Data Visualization',
        'Speech Processing',
        'Computer Vision',
        'Natural Language Processing',
        'Deep Learning',
        'Cloud Computing',
      ],
      thesis: 'Religious Sentiment Analysis using Large Language Models',
      highlights: [
        'Internet of Things (IoT) Integration',
        'Computer Vision Applications',
        'Natural Language Processing',
        'AI Model Training and Deployment',
        'AI Ethics and Human-Centric Design',
      ],
    },
    {
      degree: 'BSc in Computer Science, Mathematics and Electronics',
      institution: 'Christ Deemed To Be University',
      location: 'Bengaluru, India',
      period: '2020 - 2023',
      coursework: [
        'Operating System',
        'Data Structures',
        'Algorithms',
        'Database Management',
        'Microprocessor',
        'Python, Java, C, SQL',
        'Web Development',
      ],
      project: 'FarmChat - A Chatbot integrated with IoT devices for smart farming solutions',
      highlights: [
        'Programming in Python, Java, C, SQL',
        'Data Structures and Algorithms',
        'Database Management Systems',
        'IoT Device Integration',
        'Team Leadership',
      ],
    },
  ]

  return (
    <section id="education" className="section-padding px-6">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <GraduationCap className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Education
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            A strong foundation in computer science and specialized expertise in AI/ML
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - desktop only */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--primary))] via-[rgb(var(--primary))]/50 to-transparent" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative flex gap-6 md:gap-12">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--primary))]/20 flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-7 h-7 text-[rgb(var(--primary))]" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm card-hover">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-balance leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-semibold text-[rgb(var(--primary))] mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-[rgb(var(--muted-foreground))]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--muted))]">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--muted))]">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Coursework */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-[rgb(var(--primary))]" />
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
                        Coursework
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thesis/Project */}
                  {(edu.thesis || edu.project) && (
                    <div className="mb-6 p-4 rounded-xl bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))]">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[rgb(var(--accent))]" />
                        <h4 className="font-semibold text-sm text-[rgb(var(--accent))]">
                          {edu.thesis ? 'Thesis' : 'Capstone Project'}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {edu.thesis || edu.project}
                      </p>
                    </div>
                  )}

                  {/* Key Skills */}
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgb(var(--muted-foreground))] mb-3">
                      Key Skills Developed
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {edu.highlights.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))] mt-1.5 flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
