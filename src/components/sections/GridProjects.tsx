"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gridRows, type Project } from "@/data/projects";
import ProjectLink from "@/components/ui/ProjectLink";

gsap.registerPlugin(ScrollTrigger);

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const alignRight = index % 2 === 1;

  return (
    <div style={{ display: "flex", justifyContent: alignRight ? "flex-end" : "flex-start" }}>
      <ProjectLink
        href={`/projets/${project.slug}`}
        className="gp-item"
        data-cursor-label="logo"
        style={{
          display: "block",
          width: "clamp(240px, 38vw, 580px)",
          maxWidth: "100%",
          textDecoration: "none",
        }}
      >
        {/* Label + tagline */}
        <div className="gp-info" style={{ marginBottom: "1.75rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--muted)",
              marginBottom: "0.9rem",
            }}
          >
            {project.title}
          </p>
          <h3
            style={{
              fontSize: "clamp(1.4rem, 2.6vw, 2.15rem)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            {project.tagline}
          </h3>
        </div>

        {/* Image - sized to its own real ratio, never cropped */}
        <div className="gp-img-wrap" style={{ position: "relative", overflow: "hidden" }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="gp-img"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "clamp(220px, 32vw, 420px)",
                background: "var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--muted)",
                }}
              >
                Bientôt disponible
              </span>
            </div>
          )}
        </div>
      </ProjectLink>
    </div>
  );
}

export default function GridProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gp-item").forEach((item) => {
        gsap.from(item.querySelector(".gp-info"), {
          y: 24, opacity: 0, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
        // Image reveal - clip-path wipe from bottom
        gsap.fromTo(
          item.querySelector(".gp-img-wrap"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            delay: 0.15,
            ease: "power4.inOut",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
        // Subtle zoom out on image itself
        gsap.fromTo(
          item.querySelector(".gp-img"),
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            delay: 0.15,
            ease: "power4.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
        // Parallax drift on the whole frame rather than the image inside
        // it, so the image is always shown whole, never cropped.
        gsap.fromTo(
          item.querySelector(".gp-img-wrap"),
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
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
      id="grid-projects"
      style={{ position: "relative", zIndex: 20 }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div style={{ padding: "7rem clamp(2.5rem, 5vw, 5rem) 6rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            marginBottom: "1.2rem",
          }}
        >
          Portfolio
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Tous les projets
        </h2>
      </div>

      {/* ── Staggered list - one project at a time, lots of breathing room ── */}
      <div
        style={{
          padding: "0 clamp(2.5rem, 5vw, 5rem) 10rem",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10rem, 32vh, 24rem)",
        }}
      >
        {gridRows.map((project, i) => (
          <ProjectEntry key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
