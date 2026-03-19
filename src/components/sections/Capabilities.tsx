"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CapRow =
  | { id: string; title: string; type: "service"; description: string }
  | { id: string; title: string; type: "knowledge"; tools: string[] };

const capabilities: CapRow[] = [
  {
    id: "01",
    type: "service",
    title: "Direction Artistique",
    description:
      "Je crée des univers visuels qui racontent votre histoire, cassent les codes, et font de chaque détail un atout.",
  },
  {
    id: "02",
    type: "service",
    title: "UI/UX Design",
    description:
      "Je conçois des interfaces qui ne fonctionnent pas seulement — elles captivent, guident et transforment la façon dont les gens vivent votre marque.",
  },
  {
    id: "03",
    type: "service",
    title: "Développement Web",
    description:
      "Je développe des expériences digitales rapides, fluides et mémorables — du code qui s'exprime et performe.",
  },
  {
    id: "04",
    type: "service",
    title: "Brand Identity",
    description:
      "Je crée des identités qui ne représentent pas seulement — elles résonnent, inspirent et laissent une empreinte durable.",
  },
  {
    id: "05",
    type: "knowledge",
    title: "Design & UI Animation",
    tools: ["Figma", "Google Gemini", "ChatGPT", "Photoshop"],
  },
  {
    id: "06",
    type: "knowledge",
    title: "Development Technologies",
    tools: ["HTML", "CSS", "Sass", "JavaScript", "Python", "Claude.ai", "Framer"],
  },
  {
    id: "07",
    type: "knowledge",
    title: "Project Management",
    tools: ["Trello", "Agile", "Jira", "Notion", "ClickUp"],
  },
  {
    id: "08",
    type: "knowledge",
    title: "Collaboration & Cooperation",
    tools: ["Slack", "Zoom", "Email", "Google Meet", "Skype"],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      capabilities.forEach((_, i) => {
        gsap.fromTo(
          `.cap-row-${i}`,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.cap-row-${i}`,
              start: "top 78%",
              end: "top 42%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      style={{
        background: "var(--background)",
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div
        style={{
          padding: "7rem clamp(2.5rem, 5vw, 5rem) 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            marginBottom: "1.2rem",
          }}
        >
          Services & Knowledge
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Capabilities
        </h2>
      </div>

      {/* ── Rows ─────────────────────────────────────────────── */}
      {capabilities.map((cap, i) => (
        <div
          key={cap.id}
          className={`cap-row-${i}`}
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(3rem,6vw,6rem) 1fr 1fr",
            alignItems: "baseline",
            gap: "clamp(1rem, 3vw, 3rem)",
            padding: "clamp(2rem, 3.5vw, 3.5rem) clamp(2.5rem, 5vw, 5rem)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Number */}
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              paddingTop: "0.2rem",
            }}
          >
            {cap.id}
          </span>

          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(1.6rem, 3vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {cap.title}
          </h3>

          {/* Content */}
          {cap.type === "service" ? (
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {cap.description}
            </p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 0", alignItems: "center" }}>
              {cap.tools.map((tool, j) => (
                <span
                  key={j}
                  style={{
                    fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
                    color: "var(--muted)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tool}
                  {j < cap.tools.length - 1 && (
                    <span style={{ opacity: 0.3, margin: "0 0.6rem" }}>·</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
