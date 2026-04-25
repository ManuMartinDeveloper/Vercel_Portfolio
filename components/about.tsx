import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-[rgb(var(--muted))]/30">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/about-me-photo.jpg"
                alt="AI Technology and Innovation"
                width={500}
                height={500}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-delay">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              About Me
            </h2>
            
            <div className="space-y-4 text-lg leading-relaxed text-pretty">
              <p>
                My passion for Artificial Intelligence and Machine Learning began with an early fascination for automation, 
                blossoming into a clear vision: to be a Human-Centric AI Technologist. I am dedicated to creating intelligent 
                systems that not only leverage technical marvels but genuinely benefit people and serve on humanitarian grounds. 
                My deepest motivation lies in AI's profound potential to elevate human lives.
              </p>

              <p>
                Though at the start of my professional career, my drive to master the AI/ML domain is immense. I excel at 
                developing smart AI agents and applications that offer intuitive user experiences, focusing my expertise in IoT, 
                Computer Vision, and Natural Language Processing on one goal: transforming complex data into innovative, efficient, 
                and accessible solutions. My work is consistently guided by ethical principles, aiming to foster positive change, 
                particularly for underserved communities and pressing global challenges.
              </p>

              <p>
                Outside of AI, I find balance and inspiration amidst the natural beauty of Kerala through hiking, delving into 
                the thought-provoking narratives of sci-fi, or simply enjoying a good conversation. My philosophy is rooted in 
                continuous learning, guided by faith and strong moral principles, as I seek new challenges to expand my horizons 
                and make a meaningful difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
