"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "06",
    title: "Nom du projet",
    category: "Branding",
    year: "2023",
    tint: "rgba(180,140,120,0.45)",
  },
  {
    id: "07",
    title: "Nom du projet",
    category: "Web Design",
    year: "2023",
    tint: "rgba(100,130,160,0.45)",
  },
  {
    id: "08",
    title: "Nom du projet",
    category: "Motion Design",
    year: "2023",
    tint: "rgba(140,110,170,0.45)",
  },
  {
    id: "09",
    title: "Nom du projet",
    category: "Développement",
    year: "2022",
    tint: "rgba(90,150,130,0.45)",
  },
  {
    id: "10",
    title: "Nom du projet",
    category: "UI/UX",
    year: "2022",
    tint: "rgba(160,130,90,0.45)",
  },
  {
    id: "11",
    title: "Nom du projet",
    category: "Identity",
    year: "2022",
    tint: "rgba(110,130,150,0.45)",
  },
  {
    id: "12",
    title: "Nom du projet",
    category: "Creative Dev",
    year: "2022",
    tint: "rgba(150,110,110,0.45)",
  },
];

export default function OtherProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".op-card", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Drag scroll with momentum
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let rafId = 0;
    let moved = false;

    const applyMomentum = () => {
      velocity *= 0.92;
      track.scrollLeft += velocity;
      if (Math.abs(velocity) > 0.4) {
        rafId = requestAnimationFrame(applyMomentum);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      moved = false;
      startX = e.pageX;
      scrollLeft = track.scrollLeft;
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
      cancelAnimationFrame(rafId);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      if (Math.abs(e.pageX - startX) > 4) moved = true;
      if (!moved) return;
      setDragging(true);
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      velocity = ((lastX - e.pageX) / dt) * 14;
      lastX = e.pageX;
      lastTime = now;
      track.scrollLeft = scrollLeft + (startX - e.pageX);
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      setDragging(false);
      rafId = requestAnimationFrame(applyMomentum);
    };

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX;
      scrollLeft = track.scrollLeft;
      lastX = e.touches[0].pageX;
      lastTime = performance.now();
      velocity = 0;
      cancelAnimationFrame(rafId);
    };

    const onTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      velocity = ((lastX - e.touches[0].pageX) / dt) * 14;
      lastX = e.touches[0].pageX;
      lastTime = now;
      track.scrollLeft = scrollLeft + (startX - e.touches[0].pageX);
    };

    const onTouchEnd = () => {
      rafId = requestAnimationFrame(applyMomentum);
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="other-projects"
      style={{ background: "var(--background)", position: "relative", zIndex: 20 }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div
        style={{
          padding: "7rem clamp(2.5rem, 5vw, 5rem) 3.5rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
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
            Autres projets
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            paddingBottom: "0.4rem",
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
            Scroll ou drag
          </span>
          <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>→</span>
        </div>
      </div>

      {/* ── Scrollable track ────────────────────────────────── */}
      <div
        ref={trackRef}
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
          cursor: dragging ? "grabbing" : "grab",
          paddingLeft: "clamp(2.5rem, 5vw, 5rem)",
          paddingRight: "clamp(2.5rem, 5vw, 5rem)",
          paddingBottom: "1px",
          scrollbarWidth: "none",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          msOverflowStyle: "none" as any,
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div style={{ display: "flex", gap: "1.25rem", width: "max-content" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="op-card"
              style={{
                position: "relative",
                height: "clamp(360px, 70vh, 620px)",
                width: "clamp(230px, 26vw, 400px)",
                flexShrink: 0,
                overflow: "hidden",
                cursor: dragging ? "grabbing" : "pointer",
              }}
            >
              {/* Background image */}
              <img
                src="/img/exemple.avif"
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  pointerEvents: "none",
                }}
                className="op-card-img"
              />

              {/* Color tint overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: project.tint,
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                }}
              />

              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Index number */}
              <span
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.08em",
                  pointerEvents: "none",
                }}
              >
                {project.id}
              </span>

              {/* Bottom info */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem 1.5rem 1.75rem",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {project.category} · {project.year}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
