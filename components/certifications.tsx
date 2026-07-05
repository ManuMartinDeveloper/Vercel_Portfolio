"use client"

import { Award } from "lucide-react"
import { confetti } from "@/lib/confetti"
import { tiltMove, tiltReset } from "@/lib/tilt"

/**
 * Certifications — verified Credly badges.
 * Images and verification links come straight from each badge's public Credly page.
 */
const certifications = [
  {
    title: "Analyze Sentiment with Natural Language API",
    issuer: "Google Cloud",
    image: "https://images.credly.com/images/bd687b0c-3959-4e06-b511-6623e32b8fdb/linkedin_thumb_image.png",
    url: "https://www.credly.com/badges/56c3b570-5b93-4eeb-96b1-669abc59b480/public_url",
  },
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/linkedin_thumb_blob",
    url: "https://www.credly.com/badges/46a31547-3437-4b2e-a2e9-8609da015640/public_url",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    image: "https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/linkedin_thumb_blob",
    url: "https://www.credly.com/badges/6a9ce5cc-56d3-46a8-9d95-ec7a803c9e2b/public_url",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
    url: "https://www.credly.com/badges/7a201c63-808e-4e13-89e5-c57ddd678d49/public_url",
  },
  {
    title: "Introduction to Internet of Things (IoT)",
    issuer: "Cisco Networking Academy",
    image: "https://images.credly.com/images/fce226c2-0f13-4e17-b60c-24fa6ffd88cb/linkedin_thumb_Intro2IoT.png",
    url: "https://www.credly.com/badges/3c645de8-77d8-4dfe-9592-55152994c35e/public_url",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className="w-10 h-10 text-[rgb(var(--primary))]" />
          <h2 className="text-4xl md:text-5xl font-bold text-center">Certifications</h2>
        </div>
        <p className="text-center mb-12 text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
          Verified credentials and badges from Credly. Click any badge to view its verification.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={tiltMove}
              onMouseLeave={tiltReset}
              onClick={(e) => confetti({ x: e.clientX, y: e.clientY, count: 70 })}
              style={{ transition: "transform 0.2s ease-out" }}
              className="group flex flex-col items-center text-center bg-[rgb(var(--card))] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-[rgb(var(--primary))]/10"
            >
              <div className="w-28 h-28 mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={`${cert.title} badge`}
                  className="w-28 h-28 object-contain group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-sm leading-snug group-hover:text-[rgb(var(--primary))] transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{cert.issuer}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
