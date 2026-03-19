"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Project data ─────────────────────────────────────────────
   Replace tint + title + category with your real content.
   ratio: CSS aspect-ratio value for the image block.
─────────────────────────────────────────────────────────────── */
const rows: Array<Array<{
  id: string;
  title: string;
  category: string;
  year: string;
  tint: string;
  ratio: string;
  flex: number; // relative width weight in the row
}>> = [
  // Row 1 — large left, portrait right
  [
    { id: "01", title: "Nom du projet", category: "Branding",    year: "2024", tint: "rgba(160,130,110,0.4)", ratio: "4/3",  flex: 6 },
    { id: "02", title: "Nom du projet", category: "Web Design",  year: "2024", tint: "rgba( 90,120,150,0.4)", ratio: "3/4",  flex: 4 },
  ],
  // Row 2 — portrait left, large right (mirrored)
  [
    { id: "03", title: "Nom du projet", category: "Motion",      year: "2023", tint: "rgba(130,100,160,0.4)", ratio: "3/4",  flex: 4 },
    { id: "04", title: "Nom du projet", category: "Développement",year:"2023", tint: "rgba( 80,140,120,0.4)", ratio: "4/3",  flex: 6 },
  ],
  // Row 3 — cinematic full-width
  [
    { id: "05", title: "Nom du projet", category: "Creative Dev", year: "2023", tint: "rgba(110,110,130,0.4)", ratio: "21/9", flex: 1 },
  ],
];

export default function GridProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gp-item").forEach((item) => {
        // Image reveal — clip-path wipe from bottom
        gsap.fromTo(
          item.querySelector(".gp-img-wrap"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power4.inOut",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
        // Info fade up
        gsap.from(item.querySelector(".gp-info"), {
          y: 18, opacity: 0, duration: 0.7, delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
        // Subtle zoom out on image itself
        gsap.fromTo(
          item.querySelector(".gp-img"),
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="grid-projects"
      style={{ background: "var(--background)", position: "relative", zIndex: 20 }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div style={{ padding: "7rem clamp(2.5rem, 5vw, 5rem) 4rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            marginBottom: "1.2rem",
          }}
        >
          Work
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Tous les projets
        </h2>
      </div>

      {/* ── Grid ────────────────────────────────────────────── */}
      <div
        style={{
          padding: "0 clamp(2.5rem, 5vw, 5rem) 8rem",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(2rem, 3vw, 3.5rem)",
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: "flex",
              gap: "clamp(1rem, 1.5vw, 1.75rem)",
              alignItems: "flex-start",
            }}
          >
            {row.map((project) => (
              <div
                key={project.id}
                className="gp-item"
                style={{ flex: project.flex, minWidth: 0 }}
              >
                {/* Image block */}
                <div
                  className="gp-img-wrap"
                  data-cursor="view"
                  style={{
                    position: "relative",
                    aspectRatio: project.ratio,
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  <img
                    src="/img/exemple.avif"
                    alt={project.title}
                    draggable={false}
                    className="gp-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transformOrigin: "center center",
                    }}
                  />
                  {/* Tint */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: project.tint,
                      mixBlendMode: "multiply",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Info row */}
                <div
                  className="gp-info"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.65rem",
                        color: "var(--muted)",
                        letterSpacing: "0.06em",
                        flexShrink: 0,
                      }}
                    >
                      {project.id}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--muted)",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.category} · {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
