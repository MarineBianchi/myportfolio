"use client";

import { useEffect, useRef } from "react";
import ProjectLink from "@/components/ui/ProjectLink";
import { featuredProjects as projects } from "@/data/projects";

// Band height in px - info + description. Includes a little extra top
// padding so the sticky panel's title doesn't crowd the fixed navbar once
// it takes over from the hero.
const BAND_H = 196;

// Shared backdrop behind every panel's video - brand identity texture,
// not the project's own photo. fond1/fond2/fond3 are also available for
// reuse elsewhere.
const PANEL_BACKDROP = "/img/fond-covers.jpg";

// Vertical breathing room around each panel's video.
const VIDEO_PAD_Y = "clamp(3rem, 9vh, 6rem)";

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
          background: "var(--background)",
          padding: "7rem clamp(2.5rem, 5vw, 5rem) 5rem",
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
          Projets
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Travaux selectionnés
        </h2>
      </div>

      {/* ── Sticky stacked panels ─────────────────────────────── */}
      {projects.map((project, i) => (
        <ProjectLink
          key={project.id}
          href={`/projets/${project.slug}`}
          data-cursor-label="logo"
          className="proj-section"
          style={{
            position: "sticky",
            top: 0,
            height: "100svh",
            zIndex: i + 1,
            overflow: "hidden",
            display: "block",
            textDecoration: "none",
          }}
        >
          {/* ── Info band - TOP ─────────────────────────────── */}
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
              padding: "0 clamp(2.5rem, 5vw, 5rem) 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
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
                  className="proj-meta"
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
                  className="proj-meta"
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

            {/* Row 2: tagline */}
            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.55,
                color: "var(--muted)",
                maxWidth: "64ch",
                margin: 0,
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* ── Background ───────────────────────────────────── */}
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
            {project.backdrop ? (
              // Project's own backdrop. When blurred, the slight scale hides
              // the blur's soft edges.
              <img
                src={project.backdrop}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: project.blurBackdrop ? "scale(1.15)" : undefined,
                  filter: project.blurBackdrop
                    ? "blur(24px) brightness(0.85)"
                    : "brightness(0.85)",
                }}
              />
            ) : (
              <img
                src={PANEL_BACKDROP}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "left center",
                  display: "block",
                  transform: "scale(1.6)",
                  transformOrigin: "left center",
                  filter: "brightness(0.85)",
                }}
              />
            )}
          </div>

          {/* ── Video / placeholder centered ─────────────────── */}
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
              padding: `${VIDEO_PAD_Y} clamp(3rem, 8vw, 8rem)`,
            }}
          >
            <div
              className="proj-video"
              style={{
                // Capped by the height left under the band too, so on short
                // screens the 16:9 frame shrinks instead of being cropped.
                width: `min(100%, 720px, (100svh - ${BAND_H}px - 2 * ${VIDEO_PAD_Y}) * 16 / 9)`,
                aspectRatio: "16/9",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                transformOrigin: "center center",
              }}
            >
              {project.video ? (
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
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px dashed rgba(255,255,255,0.35)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Bientôt disponible
                  </span>
                </div>
              )}
            </div>
          </div>
        </ProjectLink>
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
