"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { otherProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function OtherProjects() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Below 768px the viewport is too narrow for a pinned fullscreen panel
  // per item to read well, and `pin: true` fights the page's natural
  // vertical scroll on touch - falls back to a plain horizontally
  // scrollable strip instead (see JSX below).
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    // Reads matchMedia directly rather than trusting the `isMobile` state:
    // on mount this effect and the state-setting effect above both run off
    // the same (still-`false`) initial render, so the state alone would let
    // this fire once on phones with `pin: true` before the next render
    // corrects it - leaving a stray pin-spacer sized for the desktop
    // 100svh layout sitting as dead space above the footer.
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (!pinWrap || !track || mobile) return;

    const ctx = gsap.context(() => {
      // Each panel is a full viewport wide - vertical scroll drives the
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
  }, [isMobile]);

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
            Et aussi
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

      {/* ── Horizontal sequence: pinned fullscreen on desktop, a plain
          swipeable strip on mobile (see isMobile above) ──────────── */}
      <div
        ref={pinWrapRef}
        style={
          isMobile
            ? { position: "relative", overflowX: "auto", WebkitOverflowScrolling: "touch" }
            : { position: "relative", height: "100svh", overflow: "hidden" }
        }
      >
        <div
          ref={trackRef}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "1rem",
                  padding: "0 clamp(1.5rem, 5vw, 2.5rem) 1rem",
                  scrollSnapType: "x mandatory",
                }
              : {
                  display: "flex",
                  height: "100%",
                  width: `${otherProjects.length * 100}vw`,
                }
          }
        >
          {otherProjects.map((item) => (
            <div
              key={item.id}
              style={
                isMobile
                  ? {
                      position: "relative",
                      width: "88vw",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }
                  : {
                      position: "relative",
                      width: "100vw",
                      height: "100%",
                      flexShrink: 0,
                    }
              }
            >
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                style={{
                  ...(isMobile
                    ? {
                        // One shared 3:2 frame - the middle ground between
                        // the ~2:1 panoramas and the square posters.
                        width: "100%",
                        aspectRatio: "3 / 2",
                        objectFit: "cover",
                        objectPosition: item.mobilePosition,
                        borderRadius: 8,
                      }
                    : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }),
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              {/* Desktop overlays the title on the full-screen image; on the
                  smaller mobile card it sits below, clear of the image. */}
              {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
              )}
              <p
                style={
                  isMobile
                    ? {
                        marginTop: "0.75rem",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--foreground)",
                      }
                    : {
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
                      }
                }
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
