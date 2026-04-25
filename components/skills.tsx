'use client'

import { Code, Wrench, Users, Sparkles } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: Code,
      color: 'primary',
      skills: [
        { category: 'Programming', items: ['Python', 'SQL', 'R', 'JavaScript', 'Java', 'C'] },
        { category: 'ML/DL', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'] },
        { category: 'Data Analysis', items: ['Pandas', 'NumPy', 'SciPy'] },
        { category: 'Web Development', items: ['HTML', 'CSS', 'Flask', 'FastAPI', 'Streamlit'] },
        { category: 'Computer Vision', items: ['OpenCV', 'YOLO', 'Image Processing'] },
        { category: 'NLP', items: ['Transformers', 'LangChain', 'RAG'] },
        { category: 'Data Viz', items: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI'] },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: Wrench,
      color: 'accent',
      skills: [
        { category: 'Cloud', items: ['AWS S3', 'EC2', 'Lambda', 'GCP'] },
        { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL'] },
        { category: 'Version Control', items: ['Git', 'GitHub'] },
        { category: 'Containers', items: ['Docker'] },
        { category: 'BI Tools', items: ['Tableau', 'Power BI'] },
        { category: 'IoT', items: ['Raspberry Pi', 'Arduino', 'Blynk'] },
        { category: 'NLP Tools', items: ['Hugging Face', 'LangChain'] },
      ],
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'primary',
      skills: [
        { items: ['Problem Solving', 'Communication', 'Teamwork'] },
        { items: ['Critical Thinking', 'Adaptability', 'Project Management'] },
        { items: ['Mentorship', 'Leadership', 'Time Management'] },
        { items: ['Empathy', 'Emotional Intelligence'] },
        { items: ['Continuous Learning', 'Research'] },
        { items: ['Ethical AI Practices'] },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding px-6 bg-[rgb(var(--muted))]/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">What I bring to the table</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            A comprehensive toolkit built through education, projects, and hands-on experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 shadow-sm card-hover"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl ${
                    category.color === 'accent' 
                      ? 'bg-[rgb(var(--accent))]/10' 
                      : 'bg-[rgb(var(--primary))]/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      category.color === 'accent' 
                        ? 'text-[rgb(var(--accent))]' 
                        : 'text-[rgb(var(--primary))]'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      {skill.category && (
                        <h4 className="text-sm font-semibold text-[rgb(var(--muted-foreground))] mb-2 uppercase tracking-wider">
                          {skill.category}
                        </h4>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {skill.items.map((item, j) => (
                          <span
                            key={j}
                            className="text-xs px-2.5 py-1 rounded-full bg-[rgb(var(--muted))] font-medium transition-colors hover:bg-[rgb(var(--primary))]/10 hover:text-[rgb(var(--primary))]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-[rgb(var(--muted-foreground))]">
            Always learning and expanding my expertise in emerging AI technologies
          </p>
        </div>
      </div>
    </section>
  )
}
