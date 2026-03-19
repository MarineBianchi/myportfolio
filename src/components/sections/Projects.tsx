"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01",
    title: "APIHIVE",
    category: "Développement Web",
    year: "2024",
    description: "Plateforme de gestion d'APIs avec dashboard interactif, authentification et documentation en temps réel.",
    video: "/img/videos/APIHIVE.mp4",
  },
  {
    id: "02",
    title: "Alizée Chaz",
    category: "Design Graphique",
    year: "2024",
    description: "Identité visuelle complète — logotype, charte graphique et supports de communication print & digital.",
    video: "/img/videos/AlizeeChaz.mov",
  },
  {
    id: "03",
    title: "Lea Losteo",
    category: "Développement Web",
    year: "2024",
    description: "Site vitrine avec système de réservation en ligne, animations fluides et intégration CMS headless.",
    video: "/img/videos/LeaLosteo.mp4",
  },
  {
    id: "04",
    title: "Eau & Dev",
    category: "Creative Dev",
    year: "2023",
    description: "Expérience web immersive avec shaders GLSL, storytelling interactif et effets de parallaxe WebGL.",
    video: "/img/videos/eau&dev.mp4",
  },
  {
    id: "05",
    title: "Jardins Nini",
    category: "UI/UX Design",
    year: "2023",
    description: "Refonte UX complète d'une boutique en ligne — parcours utilisateur, prototypage et système de design.",
    video: "/img/videos/jardinsNini.mp4",
  },
];

// Band height in px — info + description
const BAND_H = 172;

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on video while panel is active
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const sections = container.querySelectorAll<HTMLElement>(".proj-section");
      const scrollY = window.scrollY;
      const containerTop = container.getBoundingClientRect().top + scrollY;
      const headerH =
        container.querySelector<HTMLElement>(".proj-header")?.offsetHeight ?? 0;

      sections.forEach((section, i) => {
        const video = section.querySelector<HTMLElement>(".proj-video");
        if (!video) return;
        const activatesAt = containerTop + headerH + i * window.innerHeight;
        const p = Math.max(0, Math.min(1, (scrollY - activatesAt) / window.innerHeight));
        video.style.transform = `scale(1.06) translateY(${p * -6}%)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} id="projects">
      {/* ── Header ────────────────────────────────────────────── */}
      <div
        className="proj-header"
        style={{
          padding: "7rem clamp(2.5rem, 5vw, 5rem) 5rem",
          background: "var(--background)",
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
          Selected work
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Featured Works
        </h2>
      </div>

      {/* ── Sticky stacked panels ─────────────────────────────── */}
      {projects.map((project, i) => (
        <section
          key={project.id}
          className="proj-section"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: i + 1,
            overflow: "hidden",
          }}
        >
          {/* ── Info band — TOP ─────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: BAND_H,
              zIndex: 10,
              background: "var(--background)",
              borderBottom: "1px solid var(--border)",
              padding: "0 clamp(2.5rem, 5vw, 5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.55rem",
            }}
          >
            {/* Row 1: number + title ← → category + year + arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.id}
                </span>
                <h3
                  style={{
                    fontSize: "clamp(1rem, 1.6vw, 1.45rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--foreground)",
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--muted)",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "var(--muted)",
                  }}
                >
                  {project.year}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "var(--foreground)",
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
              </div>
            </div>

            {/* Row 2: description */}
            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.55,
                color: "var(--muted)",
                maxWidth: "64ch",
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* ── Background image ────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: BAND_H,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            <img
              src="/img/exemple.avif"
              alt=""
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.55)",
              }}
            />
          </div>

          {/* ── Video centered ──────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: BAND_H,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              padding: "clamp(1.5rem, 3vh, 3rem) clamp(3rem, 8vw, 8rem)",
            }}
          >
            <div
              className="proj-video"
              style={{
                width: "100%",
                maxWidth: "900px",
                aspectRatio: "16/9",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                transformOrigin: "center center",
              }}
            >
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </section>
      ))}

      {/* ── Transition back to light ─────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "3rem",
          zIndex: projects.length + 1,
          background: "var(--background)",
          borderTop: "1px solid var(--border)",
        }}
      />
    </div>
  );
}
