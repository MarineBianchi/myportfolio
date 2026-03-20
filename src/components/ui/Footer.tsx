"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = ["Portfolio", "Services", "Contact"];
const SOCIALS = ["LinkedIn", "Behance", "Instagram"];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  // ── Live clock ───────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
  const NAME_CHUNK = "MARINE BIANCHI\u00A0\u00A0·\u00A0\u00A0";
  const repeated = NAME_CHUNK.repeat(6);

  return (
    <footer
      style={{
        background: "#111",
        overflow: "hidden",
        position: "relative",
        zIndex: 30,
      }}
    >
      {/* ── Top block ───────────────────────────────────────────── */}
      <div
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
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f8f7f4",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right — email + socials */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2.5rem" }}>
          <a
            href="mailto:hello@marinebianchi.fr"
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
            hello@marinebianchi.fr
          </a>

          <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 4rem)", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
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
                {s}&nbsp;↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bracket links ───────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2.2rem clamp(2.5rem, 5vw, 5rem)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {SOCIALS.map((s) => (
          <a
            key={s}
            href="#"
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#f8f7f4",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            [ {s} ]
          </a>
        ))}
      </div>

      {/* ── Name marquee ────────────────────────────────────────── */}
      <div style={{ overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem 0" }}>
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

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.8rem clamp(2.5rem, 5vw, 5rem)",
        }}
      >
        {/* ① Dot signature */}
        <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.35)", display: "inline-block" }} />
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
            Paris, France (GMT+1)&nbsp;&nbsp;{time}
          </span>
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.35)", display: "inline-block" }} />
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
            La porte est toujours ouverte.
          </span>
        </span>
      </div>
    </footer>
  );
}
