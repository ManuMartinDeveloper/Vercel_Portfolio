"use client"

import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Certifications — Credly badges.
 *
 * TODO: Replace the placeholder values below with your real Credly badge data.
 *  - `title`   : the certification name
 *  - `issuer`  : the issuing organisation
 *  - `badgeId` : the id from your badge URL — credly.com/badges/<badgeId>
 *  - `image`   : the badge image URL (open the badge on Credly, right-click the
 *                image → "Copy image address", e.g. https://images.credly.com/size/220x220/images/<uuid>/image.png)
 *
 * Prefer the official Credly embed instead of image cards? Swap each card body
 * for a div and load the embed script once:
 *   <div data-iframe-width="150" data-iframe-height="270"
 *        data-share-badge-id={cert.badgeId}
 *        data-share-badge-host="https://www.credly.com" />
 *   <Script async src="//cdn.credly.com/assets/utilities/embed.js" />   // from next/script
 */
const CREDLY_PROFILE = "https://www.credly.com/users/manu-martin"

const certifications = [
  { title: "Certification 1", issuer: "Issuing Organisation", badgeId: "REPLACE_WITH_BADGE_ID_1", image: "" },
  { title: "Certification 2", issuer: "Issuing Organisation", badgeId: "REPLACE_WITH_BADGE_ID_2", image: "" },
  { title: "Certification 3", issuer: "Issuing Organisation", badgeId: "REPLACE_WITH_BADGE_ID_3", image: "" },
  { title: "Certification 4", issuer: "Issuing Organisation", badgeId: "REPLACE_WITH_BADGE_ID_4", image: "" },
  { title: "Certification 5", issuer: "Issuing Organisation", badgeId: "REPLACE_WITH_BADGE_ID_5", image: "" },
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
          Verified credentials and badges from Credly.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certifications.map((cert, index) => {
            const badgeUrl = `https://www.credly.com/badges/${cert.badgeId}`
            return (
              <a
                key={index}
                href={cert.badgeId.startsWith("REPLACE_WITH") ? CREDLY_PROFILE : badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center bg-[rgb(var(--card))] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[rgb(var(--primary))]/10"
              >
                <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-[rgb(var(--primary))]/10">
                  {cert.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cert.image} alt={cert.title} className="w-24 h-24 object-contain" />
                  ) : (
                    <Award className="w-10 h-10 text-[rgb(var(--primary))]" />
                  )}
                </div>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-[rgb(var(--primary))] transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{cert.issuer}</p>
              </a>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[rgb(var(--primary))]/20 hover:border-[rgb(var(--primary))]/40"
          >
            <a href={CREDLY_PROFILE} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5 mr-2" />
              View all badges on Credly
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
