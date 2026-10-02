"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { otherProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function OtherProjects() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    if (!pinWrap || !track) return;

    const ctx = gsap.context(() => {
      // Each panel is a full viewport wide — vertical scroll drives the
      // horizontal walk through them, then releases straight into the footer.
      const distance = () => (otherProjects.length - 1) * window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, pinWrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="other-projects"
      data-cursor-theme="light"
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
            Scroll
          </span>
          <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>↓</span>
        </div>
      </div>

      {/* ── Pinned fullscreen horizontal sequence ──────────────── */}
      <div
        ref={pinWrapRef}
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            width: `${otherProjects.length * 100}vw`,
          }}
        >
          {otherProjects.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                width: "100vw",
                height: "100%",
                flexShrink: 0,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "clamp(2rem, 5vw, 3.5rem)",
                  left: "clamp(2.5rem, 5vw, 5rem)",
                  right: "clamp(2.5rem, 5vw, 5rem)",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "white",
                  margin: 0,
                  pointerEvents: "none",
                }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
