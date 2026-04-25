import { GraduationCap } from 'lucide-react'

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
      skills: [
        'Internet of Things (IoT) Integration',
        'Computer Vision Applications',
        'Speech Recognition and Processing',
        'Natural Language Processing [LLMs, LangChain, RAG, Finetuning, Deployment]',
        'AI Model Training and Deployment',
        'Data Analysis and Visualization',
        'Python Programming',
        'Power BI and Tableau for Data Visualization',
        'Streamlit and FastAPI for Web Applications',
        'Cloud Computing (AWS, GCP)',
        'AI Ethics and Human-Centric Design',
        'Research Methodologies in AI',
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
        'Microprocessor, Microcontroller and Interfacing',
        'Programming in Python, Java, C, SQL',
        'Web Development (HTML, CSS, Flask)',
        'Internet of Things (IoT)',
      ],
      project: 'FarmChat - A Chatbot integrated with IoT devices for smart farming solutions',
      skills: [
        'Programming in Python, Java, C, SQL',
        'Data Structures and Algorithms',
        'Database Management Systems',
        'Web Development (HTML, CSS, Flask)',
        'IoT Device Integration',
        'Basic Machine Learning Concepts',
        'Team Collaboration and Project Management',
        'Mentorship and Leadership Skills',
      ],
    },
  ]

  return (
    <section id="education" className="py-20 px-4">
      <div className="container max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Education
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[rgb(var(--primary))]/30" />

          <div className="space-y-16">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-[rgb(var(--primary))] rounded-full border-4 border-background -translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-[rgb(var(--primary))] rounded-full animate-ping opacity-75" />
                </div>

                <div className={index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12 md:text-left'}>
                  <div className="bg-[rgb(var(--card))] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[rgb(var(--primary))]/10">
                    <div className="flex items-start gap-3 mb-4">
                      <GraduationCap className="w-6 h-6 text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-balance mb-2">{edu.degree}</h3>
                        <p className="text-lg font-medium text-[rgb(var(--primary))]">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                        <p className="text-sm font-medium mt-1">{edu.period}</p>
                      </div>
                    </div>

                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="font-semibold mb-2 text-[rgb(var(--accent))]">Relevant Coursework:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span
                              key={i}
                              className="text-sm px-3 py-1 bg-[rgb(var(--muted))] rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {edu.thesis && (
                        <div>
                          <h4 className="font-semibold mb-1 text-[rgb(var(--accent))]">Thesis/Project:</h4>
                          <p className="text-sm">{edu.thesis}</p>
                        </div>
                      )}

                      {edu.project && (
                        <div>
                          <h4 className="font-semibold mb-1 text-[rgb(var(--accent))]">Project:</h4>
                          <p className="text-sm">{edu.project}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2 text-[rgb(var(--accent))]">Major Skills Developed:</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          {edu.skills.slice(0, 6).map((skill, i) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
