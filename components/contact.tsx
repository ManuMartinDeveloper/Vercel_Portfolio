'use client'

import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Contact() {
  return (
    <section id="contact" className="section-padding px-6 bg-[rgb(var(--muted))]/30">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-4">
            <MessageCircle className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-medium text-[rgb(var(--primary))]">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            
            <form
              action="https://formsubmit.co/manu.reshma.martin@gmail.com"
              method="POST"
              className="space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="rounded-xl bg-[rgb(var(--background))] border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="rounded-xl bg-[rgb(var(--background))] border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry"
                  className="rounded-xl bg-[rgb(var(--background))] border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  className="rounded-xl bg-[rgb(var(--background))] border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))] resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--accent))] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Direct Contact */}
            <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:+918746960082"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgb(var(--muted))] transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-[rgb(var(--primary))]/10">
                    <Phone className="w-5 h-5 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Phone</p>
                    <p className="font-medium group-hover:text-[rgb(var(--primary))] transition-colors">
                      +91 87469 60082
                    </p>
                  </div>
                </a>

                <a 
                  href="mailto:manu.reshma.martin@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgb(var(--muted))] transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-[rgb(var(--primary))]/10">
                    <Mail className="w-5 h-5 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Email</p>
                    <p className="font-medium group-hover:text-[rgb(var(--primary))] transition-colors text-sm">
                      manu.reshma.martin@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3">
                  <div className="p-2 rounded-lg bg-[rgb(var(--primary))]/10">
                    <MapPin className="w-5 h-5 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Location</p>
                    <p className="font-medium text-sm">
                      Australia &middot; Full Work Rights
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Connect Online</h3>
              
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-xl border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/5"
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
                  className="flex-1 rounded-xl border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/5"
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

            {/* Availability */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 border border-[rgb(var(--primary))]/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-[rgb(var(--primary))]">
                  Available across Australia
                </span>
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                MATES (Subclass 403) visa &mdash; unrestricted work rights for 2 years
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[rgb(var(--border))] text-center">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Built with Next.js and Tailwind CSS by Manu Martin
          </p>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
            {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
