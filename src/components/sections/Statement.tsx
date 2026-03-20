"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines: Array<Array<{ text: string; italic?: boolean }>> = [
  [{ text: "Chaque projet," }],
  [{ text: "une nouvelle porte." }],
  [
    { text: "Je la conçois,", italic: true },
    { text: " vous" },
    { text: " l'ouvrez.", italic: true },
  ],
];

// Flatten to a list of chars with metadata, for GSAP targeting
// Spaces keep their layout space even at opacity:0 — no tricks needed.

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = Array.from(
        sectionRef.current?.querySelectorAll<HTMLElement>(".stmt-char") ?? []
      );
      if (!chars.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          once: true,
        },
      });

      // Each character appears instantly, one after another — typewriter feel
      tl.to(chars, {
        opacity: 1,
        duration: 0,       // snap in, no fade
        stagger: 0.038,    // ~38 ms per character
        ease: "none",
      });

      // Cursor blinks while typing, then disappears
      tl.to(
        cursorRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        `+=${chars.length * 0.038 * 0.1}` // shortly after last char
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#111",
        position: "relative",
        zIndex: 20,
        overflow: "hidden",
      }}
    >
      {/* ④ Giant "n" watermark */}
      <svg
        aria-hidden="true"
        viewBox="37.5 1 14 30"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: "-4%",
          bottom: 0,
          height: "90%",
          width: "auto",
          opacity: 0.06,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <path d="M38.57,20.85V8.03c0-1.84,.56-3.35,1.67-4.51,1.11-1.16,2.55-1.75,4.32-1.75s3.21,.58,4.32,1.75c1.11,1.17,1.67,2.67,1.67,4.51v12.82c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54V7.91c0-.92-.24-1.66-.71-2.21-.47-.55-1.13-.83-1.98-.83s-1.5,.28-1.98,.83c-.47,.55-.71,1.29-.71,2.21v12.94c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54Z" fill="white"/>
        <path d="M43.11,28.2c-.37-.37-.56-.84-.56-1.4s.19-1.07,.56-1.44,.84-.56,1.4-.56,1.04,.19,1.42,.58c.38,.38,.58,.86,.58,1.42,0,.51-.2,.97-.6,1.36-.4,.4-.86,.6-1.4,.6s-1.03-.19-1.4-.56Z" fill="white"/>
      </svg>

      <div style={{ padding: "7rem clamp(2.5rem, 5vw, 5rem)", position: "relative" }}>
        <p
          style={{
            fontSize: "clamp(2.2rem, 5vw, 5.8rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            color: "#f8f7f4",
          }}
        >
          {lines.map((line, li) => (
            <span key={li} style={{ display: "block" }}>
              {line.map((seg, si) =>
                seg.text.split("").map((char, ci) => (
                  <span
                    key={`${li}-${si}-${ci}`}
                    className="stmt-char"
                    style={{
                      opacity: 0,
                      fontStyle: seg.italic ? "italic" : "normal",
                    }}
                  >
                    {char}
                  </span>
                ))
              )}
            </span>
          ))}

          {/* Blinking cursor — sits after last char, disappears when done */}
          <span
            ref={cursorRef}
            className="stmt-cursor"
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "0.08em",
              height: "0.85em",
              background: "#f8f7f4",
              verticalAlign: "text-bottom",
              marginLeft: "0.12em",
            }}
          />
        </p>
      </div>

      <style jsx>{`
        .stmt-cursor {
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
