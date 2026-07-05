'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Github, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { confetti } from '@/lib/confetti'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const params = new URLSearchParams()
    new FormData(form).forEach((value, key) => params.append(key, String(value)))

    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/manu.reshma.martin@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: params,
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
      confetti({ y: window.innerHeight * 0.55 })
      window.dispatchEvent(new CustomEvent('portfolio:celebrate'))
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Let's Connect!
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm always eager to connect with like-minded individuals, explore new opportunities, 
              and collaborate on exciting projects. Whether you have a question, want to discuss AI, 
              or just want to say hi, feel free to reach out!
            </p>

            <form
              action="https://formsubmit.co/manu.reshma.martin@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="bg-[rgb(var(--card))] border-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))]"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="bg-[rgb(var(--card))] border-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))]"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your message"
                  required
                  rows={6}
                  className="bg-[rgb(var(--card))] border-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white"
                size="lg"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>

              {status === 'success' && (
                <p className="flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))]/10 px-4 py-3 text-sm font-medium text-[rgb(var(--primary))] animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  Thanks! Your message is on its way — Manu will get back to you soon. 🎉
                </p>
              )}
              {status === 'error' && (
                <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
                  Something went wrong. Please email manu.reshma.martin@gmail.com directly.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+918746960082" className="text-muted-foreground hover:text-[rgb(var(--primary))] transition-colors">
                      +91 87469 60082
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:manu.reshma.martin@gmail.com" className="text-muted-foreground hover:text-[rgb(var(--primary))] transition-colors">
                      manu.reshma.martin@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Perth, WA (Relocating Aug 2026)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Social Links</h3>
              
              <div className="flex gap-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40"
                >
                  <a
                    href="https://www.linkedin.com/in/manu-martin-7556971ba/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40"
                >
                  <a
                    href="https://github.com/ManuMartinDeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-muted-foreground">
          <p>Built with ❤️ using Next.js by Manu Martin</p>
        </div>
      </div>
    </section>
  )
}
