"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(imageRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Text lines animation
      const lines = textRef.current?.querySelectorAll(".text-line");
      if (lines) {
        gsap.from(lines, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Parallax
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6 md:px-12"
      style={{ background: "var(--background)", position: "relative", zIndex: 20 }}
    >
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Image placeholder */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] rounded-sm overflow-hidden"
          style={{
            background: "var(--border)",
            clipPath: "inset(0% 0% 0% 0%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/me.png"
            alt="Marine Bianchi"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Overlay text */}
          <div className="absolute bottom-6 left-6 right-6">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Marine — Based in France
            </span>
          </div>
        </div>

        {/* Text content */}
        <div ref={textRef}>
          <p
            className="text-line text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "var(--accent)" }}
          >
            À propos
          </p>

          <h2 className="text-line heading-md mb-8">
            Où la créativité<br />rencontre le code.
          </h2>

          <div
            className="text-line body-lg mb-6 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            <p>
              Développeuse full stack et graphiste, je navigue avec aisance entre
              les wireframes et les requêtes SQL. Passionnée par les interfaces
              qui donnent envie d&apos;interagir.
            </p>
          </div>

          <div
            className="text-line body-lg mb-10 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            <p>
              Du premier trait de design au déploiement en production, je prends
              en charge l&apos;ensemble du processus créatif et technique pour
              livrer des expériences cohérentes et mémorables.
            </p>
          </div>

          <div className="text-line flex flex-wrap gap-8">
            {[
              { value: "5+", label: "Années d'expérience" },
              { value: "30+", label: "Projets livrés" },
              { value: "100%", label: "Passion" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-4xl font-black"
                  style={{ color: "var(--foreground)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider mt-1"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
