"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { scrollToSection } from "@/lib/scrollToSection";

const NAV_LINKS = [
  { label: "Portfolio", href: "#grid-projects" },
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mbian/" },
  { label: "Instagram", href: "https://www.instagram.com/its.m.work/" },
  { label: "GitHub", href: "https://github.com/MarineBianchi" },
];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ── Infinite marquee ─────────────────────────────────────────
  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, []);

  // One copy of the text — duplicated in JSX for the seamless loop
  const NAME_CHUNK = "MARINE BIANCHI  ·  ";
  const repeated = NAME_CHUNK.repeat(6);

  return (
    <footer
      id="contact"
      data-cursor-theme="dark"
      style={{
        backgroundImage: "linear-gradient(rgba(10,10,10,0.12), rgba(10,10,10,0.12)), url(/img/fond2.JPG)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        overflow: "hidden",
        position: "relative",
        zIndex: 30,
      }}
    >
      {/* ── Top block ───────────────────────────────────────────── */}
      <div
        className="footer-top-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 6rem)",
          padding: "5rem clamp(2.5rem, 5vw, 5rem) 4rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Left — nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(router, link.href)}
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f8f7f4",
                textDecoration: "none",
                fontWeight: 500,
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right — email + socials */}
        <div className="footer-contact-col" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2.5rem" }}>
          <a
            href="mailto:hello.mb.pro@gmail.com"
            className="footer-email"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "#f8f7f4",
              textDecoration: "none",
              lineHeight: 1,
              textAlign: "right",
            }}
          >
            hello.mb.pro@gmail.com
          </a>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.5rem, 4vw, 4rem)", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#f8f7f4",
                  textDecoration: "none",
                  fontWeight: 500,
                  borderBottom: "1px solid rgba(255,255,255,0.4)",
                  paddingBottom: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {s.label}&nbsp;↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Name marquee ────────────────────────────────────────── */}
      <div style={{ overflow: "hidden", padding: "1.5rem 0 2.5rem" }}>
        <div
          ref={marqueeRef}
          style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              style={{
                fontSize: "clamp(4rem, 12vw, 14rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                lineHeight: 0.9,
                color: "#f8f7f4",
                textTransform: "uppercase",
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              {repeated}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
