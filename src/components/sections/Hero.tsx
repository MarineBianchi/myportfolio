"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const videos = [
  { src: "/img/videos/APIHIVE.mp4" },
  { src: "/img/videos/AlizeeChaz.mov" },
  { src: "/img/videos/LeaLosteo.mp4" },
  { src: "/img/videos/eau&dev.mp4" },
  { src: "/img/videos/jardinsNini.mp4" },
];

const allVideos = [...videos, ...videos];

const navLinks = [
  { label: "Portfolio", href: "#projects" },
  { label: "Services", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// Fixed heights (px) for top/bottom bars
const BAR = 60;
// Gap between reel bottom and bottom bar — photo peeks through here
const REEL_GAP = 52;
// Reel height (CSS value)
const REEL = "clamp(130px, 17vh, 190px)";

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    gsap.to(track, { xPercent: -50, duration: 34, ease: "none", repeat: -1 });
    return () => gsap.killTweensOf(track);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-topbar", { y: -20, opacity: 0, duration: 0.7 });
      tl.from(".h-tag",    { y: 20,  opacity: 0, duration: 0.55 }, "-=0.3");
      tl.from(".h-title",  { y: 45,  opacity: 0, duration: 0.9  }, "-=0.35");
      tl.from(".h-desc",   { y: 25,  opacity: 0, duration: 0.65 }, "-=0.35");
      tl.from(".h-img",    { scale: 0.97, opacity: 0, duration: 1.1 }, "-=0.85");
      tl.from(".h-reel",   { y: 14,  opacity: 0, duration: 0.5  }, "-=0.35");
      tl.from(".h-botbar", { y: 14,  opacity: 0, duration: 0.45 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as unknown as { lenis?: any }).lenis;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        height: "100svh",
        position: "relative",
        overflow: "hidden",
        background: "var(--background)",
      }}
    >
      {/* ─── Top bar ─────────────────────────────────────────── */}
      <div
        className="h-topbar"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: BAR,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(2.5rem, 5vw, 5rem)",
          borderBottom: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <a
          href="#"
          style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", color: "var(--foreground)" }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}
        >
          Marine.
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              animation: "pulse-dot 2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--muted)" }}>
            Available for work
          </span>
        </div>
      </div>

      {/* ─── Main content: text left + photo right ───────────── */}
      {/* The photo extends behind the reel strip (overlap effect) */}
      <div
        style={{
          position: "absolute",
          top: BAR,
          left: 0, right: 0,
          bottom: BAR,
          display: "flex",
        }}
      >
        {/* Left — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: `0 clamp(2.5rem, 5vw, 5rem)`,
            // Push text up so it clears the reel strip
            paddingBottom: REEL,
          }}
        >
          <p
            className="h-tag"
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--muted)",
              marginBottom: "2rem",
            }}
          >
            Full Stack Developer & Graphic Designer
          </p>

          <h1
            className="h-title"
            style={{
              fontSize: "clamp(1.9rem, 3.8vw, 4.4rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              maxWidth: "16ch",
            }}
          >
            Je conçois des expériences digitales mémorables.
          </h1>

          <p
            className="h-desc"
            style={{
              marginTop: "2rem",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: "30ch",
            }}
          >
            Marine Bianchi — Développeuse Full Stack & Graphiste.
            <br />
            Basée en France, disponible partout.
          </p>
        </div>

        {/* Right — photo, extends into reel zone */}
        <div
          className="h-img"
          style={{
            width: "clamp(260px, 31vw, 480px)",
            flexShrink: 0,
            borderLeft: "1px solid var(--border)",
            padding: "clamp(1.2rem, 2vw, 2rem) 0 0 0",
          }}
        >
          {/* Inner wrapper: image fills this, respecting the outer padding */}
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            <Image
              src="/img/me.png"
              alt="Marine Bianchi"
              fill
              sizes="(max-width: 768px) 0px, 31vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── Video reel — overlaps photo, photo peeks below ─────── */}
      <div
        className="h-reel"
        style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: BAR + REEL_GAP,
          height: REEL,
          zIndex: 10,
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px",
            width: "max-content",
            height: "100%",
          }}
        >
          {allVideos.map((v, i) => (
            <div
              key={i}
              style={{
                height: "calc(100% - 16px)",
                aspectRatio: "16/9",
                flexShrink: 0,
                overflow: "hidden",
                borderRadius: 3,
              }}
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────── */}
      <div
        className="h-botbar"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: BAR,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(2.5rem, 5vw, 5rem)",
          background: "var(--background)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <nav style={{ display: "flex", gap: "2.5rem" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--foreground)",
                position: "relative",
                background: "none",
                border: "none",
                cursor: "none",
                padding: 0,
              }}
              className="group"
            >
              {link.label}
              <span
                style={{
                  position: "absolute",
                  bottom: -2, left: 0,
                  height: 1,
                  width: 0,
                  background: "currentColor",
                  transition: "width 0.3s ease",
                }}
                className="group-hover:w-full"
              />
            </button>
          ))}
        </nav>

        <span
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.06em",
            color: "var(--muted)",
          }}
        >
          France · 2024
        </span>
      </div>
    </section>
  );
}
