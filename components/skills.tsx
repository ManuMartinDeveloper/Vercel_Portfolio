import { Code, Wrench, Users } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: Code,
      skills: [
        { category: 'Languages', items: 'Python, Java (Spring Boot, Spring WebFlux), JavaScript, SQL, C' },
        { category: 'Frameworks & Libraries', items: 'React.js, Material-UI, TensorFlow, PyTorch, Scikit-learn, ONNX, Hibernate, FastAPI, Streamlit' },
        { category: 'AI / ML', items: 'Transformers, LangChain, RAG Pipelines, Prompt Engineering, YOLO, OpenCV, Isolation Forest, Behaviour Modelling' },
        { category: 'Backend', items: 'Reactive REST APIs (WebFlux, WebClient), Microservices, LLM Integrations' },
        { category: 'Data Visualization', items: 'Power BI, Tableau, Matplotlib, Seaborn' },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: Wrench,
      skills: [
        { category: 'Cloud & Infrastructure', items: 'AWS, Firebase, Docker, Nextcloud' },
        { category: 'Version Control', items: 'Git, GitHub' },
        { category: 'Databases', items: 'PostgreSQL, MongoDB, MySQL' },
        { category: 'BI Tools', items: 'Power BI, Tableau' },
        { category: 'Edge & IoT', items: 'Raspberry Pi, Arduino, ONNX Runtime on edge hardware' },
        { category: 'AI Tooling', items: 'Hugging Face Transformers, LangChain, RAG, Groq API' },
      ],
    },
    {
      title: 'Soft Skills',
      icon: Users,
      skills: [
        { category: '', items: 'Problem Solving, Communication, Teamwork & Collaboration' },
        { category: '', items: 'Critical Thinking, Adaptability, Project Management' },
        { category: '', items: 'Mentorship & Leadership, Time Management' },
        { category: '', items: 'Community Engagement, Mental Health Awareness' },
        { category: '', items: 'Empathy & Emotional Intelligence, Continuous Learning' },
        { category: '', items: 'Ethical AI Practices, Research Methodologies' },
      ],
    },
  ]

  return (
    <section id="skills" className="relative py-20 px-4 bg-[rgb(var(--muted))]/30 overflow-hidden">
      <div className="container max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="bg-[rgb(var(--card))] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[rgb(var(--primary))]/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[rgb(var(--primary))]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      {skill.category && (
                        <h4 className="font-semibold text-[rgb(var(--accent))] mb-1 text-sm">
                          {skill.category}
                        </h4>
                      )}
                      <p className="text-sm leading-relaxed">{skill.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
