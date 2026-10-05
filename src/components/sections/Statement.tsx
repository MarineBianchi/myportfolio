"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Word = { text: string; bold?: boolean };

const words: Word[] = [
  { text: "Je" },
  { text: "conçois" },
  { text: "un" },
  { text: "projet" },
  { text: "du" },
  { text: "premier" },
  { text: "coup" },
  { text: "de" },
  { text: "crayon", bold: true },
  { text: "à" },
  { text: "la" },
  { text: "dernière" },
  { text: "ligne" },
  { text: "de" },
  { text: "code.", bold: true },
  { text: "Mes" },
  { text: "deux" },
  { text: "masters," },
  { text: "en" },
  { text: "Communication", bold: true },
  { text: "Digitale", bold: true },
  { text: "et" },
  { text: "en" },
  { text: "Développement", bold: true },
  { text: "Full-Stack,", bold: true },
  { text: "me" },
  { text: "permettent" },
  { text: "de" },
  { text: "donner" },
  { text: "vie" },
  { text: "à" },
  { text: "vos" },
  { text: "idées," },
  { text: "de" },
  { text: "l'identité" },
  { text: "visuelle" },
  { text: "à" },
  { text: "la" },
  { text: "mise" },
  { text: "en" },
  { text: "ligne." },
  { text: "Le" },
  { text: "design,", bold: true },
  { text: "le" },
  { text: "dessin,", bold: true },
  { text: "la" },
  { text: "photo", bold: true },
  { text: "et" },
  { text: "le" },
  { text: "code", bold: true },
  { text: "nourrissent" },
  { text: "chacun" },
  { text: "ma" },
  { text: "façon" },
  { text: "de" },
  { text: "travailler." },
];

// Words start dim and fade in solid one by one as the section scrolls
// through the viewport - pinned while it plays, same mechanic as the
// project pages' ScrollColorText.
export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const spans = section.querySelectorAll<HTMLElement>(".stmt-word");
    if (!spans.length) return;

    // Desktop pins 90px down to clear the navbar band; on mobile that
    // offset pushes the (viewport-tall) section partly off-screen, so the
    // centered copy ends up with more room above than below - it pins
    // flush to the top there instead.
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: mobile ? "top top" : "top top+=90",
          end: `+=${Math.max(spans.length * 20, 300)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Stable wrapper so React never has to remove the pinned section from
  // GSAP's .pin-spacer (see ScrollColorText).
  return (
    <div>
      <section
        ref={sectionRef}
        id="about"
        style={{
          position: "relative",
          zIndex: 20,
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Giant "n" watermark - sized off the viewport, not the text block,
          so it stays put and fully visible no matter how tall the copy is. */}
        <svg
          aria-hidden="true"
          viewBox="37.5 1 14 30"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            right: "-4%",
            bottom: 0,
            height: "70vh",
            width: "auto",
            opacity: 0.06,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <path
            d="M38.57,20.85V8.03c0-1.84,.56-3.35,1.67-4.51,1.11-1.16,2.55-1.75,4.32-1.75s3.21,.58,4.32,1.75c1.11,1.17,1.67,2.67,1.67,4.51v12.82c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54V7.91c0-.92-.24-1.66-.71-2.21-.47-.55-1.13-.83-1.98-.83s-1.5,.28-1.98,.83c-.47,.55-.71,1.29-.71,2.21v12.94c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54Z"
            style={{ fill: "var(--foreground)" }}
          />
          <path
            d="M43.11,28.2c-.37-.37-.56-.84-.56-1.4s.19-1.07,.56-1.44,.84-.56,1.4-.56,1.04,.19,1.42,.58c.38,.38,.58,.86,.58,1.42,0,.51-.2,.97-.6,1.36-.4,.4-.86,.6-1.4,.6s-1.03-.19-1.4-.56Z"
            style={{ fill: "var(--foreground)" }}
          />
        </svg>

        <div
          style={{
            padding: "clamp(4rem, 8vh, 7rem) clamp(2.5rem, 5vw, 5rem)",
            position: "relative",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              maxWidth: "48rem",
              margin: 0,
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="stmt-word"
                style={{
                  opacity: 0.15,
                  color: "var(--foreground)",
                  fontWeight: word.bold ? 700 : 400,
                }}
              >
                {word.text}{" "}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
