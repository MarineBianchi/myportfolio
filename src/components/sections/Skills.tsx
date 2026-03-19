"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = {
  "Development": [
    "Next.js", "React", "Node.js", "TypeScript",
    "PostgreSQL", "MongoDB", "Docker", "GraphQL",
  ],
  "Design": [
    "Figma", "Adobe Illustrator", "Photoshop", "After Effects",
    "Motion Design", "Branding", "UI/UX", "Typography",
  ],
  "Creative Dev": [
    "GSAP", "Three.js", "Framer Motion", "WebGL",
    "GLSL Shaders", "Canvas", "SVG Animation", "Lottie",
  ],
};

const marqueeItems = [
  "Next.js", "React", "GSAP", "Three.js", "Figma", "Node.js",
  "TypeScript", "Motion Design", "WebGL", "PostgreSQL", "Branding",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skill cards stagger
      gsap.from(".skill-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Infinite marquee
      const items = marqueeRef.current?.querySelectorAll(".marquee-item");
      if (items && items.length > 0) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 overflow-hidden"
      style={{ background: "var(--background)", position: "relative", zIndex: 20 }}
    >
      {/* Marquee */}
      <div className="mb-20 overflow-hidden border-y" style={{ borderColor: "var(--border)" }}>
        <div
          ref={marqueeRef}
          className="flex items-center py-5 whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="marquee-item text-sm uppercase tracking-widest font-bold px-8"
              style={{ color: i % 3 === 0 ? "var(--accent)" : "var(--muted)" }}
            >
              {item}
              <span className="ml-8 opacity-30">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Section header */}
        <h2 className="heading-lg mb-16">Skills</h2>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="skill-card p-8 rounded-sm"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="text-xs uppercase tracking-[0.3em] mb-6 font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
