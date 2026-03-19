"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".contact-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "var(--foreground)", zIndex: 20 }}
    >
      {/* Big background text */}
      <span
        className="absolute left-0 bottom-0 text-[20vw] font-black opacity-[0.025] select-none pointer-events-none leading-none uppercase"
        style={{ color: "var(--background)" }}
      >
        Contact
      </span>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <p
          className="contact-item text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Travaillons ensemble
        </p>

        <h2 ref={titleRef} className="heading-xl mb-12 max-w-4xl" style={{ color: "var(--background)" }}>
          Un projet<br />en tête ?
        </h2>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p
              className="contact-item body-lg max-w-lg mb-8"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Disponible pour des missions freelance, des collaborations
              ou des postes en CDI. N&apos;hésite pas à me contacter.
            </p>

            <a
              href="mailto:hello@marine.dev"
              className="contact-item group inline-flex items-center gap-4 heading-md"
              style={{ color: "var(--background)" }}
            >
              <span className="group-hover:underline transition-all">
                hello@marine.dev
              </span>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                →
              </span>
            </a>
          </div>

          {/* Social links */}
          <div className="contact-item flex flex-col gap-4">
            {[
              { label: "GitHub", url: "https://github.com" },
              { label: "LinkedIn", url: "https://linkedin.com" },
              { label: "Dribbble", url: "https://dribbble.com" },
              { label: "Behance", url: "https://behance.net" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group text-sm uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ background: "rgba(255,255,255,0.6)" }} />
                <span className="group-hover:text-white transition-colors duration-300">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2024 Marine — Tous droits réservés
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Designé & développé avec passion
          </span>
        </div>
      </div>
    </section>
  );
}
