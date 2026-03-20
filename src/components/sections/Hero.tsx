"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const videos = [
  { src: "/videos/APIHIVE.mp4" },
  { src: "/videos/AlizeeChaz.mov" },
  { src: "/videos/LeaLosteo.mp4" },
  { src: "/videos/eau&dev.mp4" },
  { src: "/videos/jardinsNini.mp4" },
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
          background: "var(--background)",
        }}
      >
        <a
          href="#"
          style={{ display: "block", lineHeight: 0 }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}
        >
          <img
            src="/videos/logo.svg"
            alt="Marine Bianchi"
            style={{ height: 28, display: "block", filter: "brightness(0)" }}
          />
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
            Bienvenue.
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
            Entrez dans l'expérience digitale.
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
            Studio ouvert · Basée en France.
          </p>
        </div>

        {/* Right — deux photos */}
        <div
          className="h-img"
          style={{
            width: "clamp(300px, 36vw, 560px)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.6rem, 1vw, 1rem)",
            padding: "clamp(1rem, 1.5vw, 1.5rem)",
            paddingBottom: `calc(${REEL_GAP}px + clamp(130px, 17vh, 190px) + 1rem)`,
            overflow: "hidden",
          }}
        >
          {/* m2 — grande, portrait */}
          <div style={{ flex: 5, minWidth: 0, position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
            <Image
              src="/img/m2.png"
              alt="Marine Bianchi"
              fill
              sizes="(max-width: 768px) 0px, 20vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* m3 — légèrement décalée */}
          <div style={{ flex: 4, minWidth: 0, position: "relative", aspectRatio: "2/3", overflow: "hidden", marginTop: "clamp(2rem, 4vw, 5rem)" }}>
            <Image
              src="/img/m3.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 0px, 15vw"
              className="object-cover object-center"
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
          background: "#000",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "max-content",
            height: "100%",
            padding: "8px 0",
          }}
        >
          {allVideos.map((v, i) => (
            <div
              key={i}
              style={{
                height: "calc(100% - 16px)", /* 16px = 2 × 8px padding vertical */
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
