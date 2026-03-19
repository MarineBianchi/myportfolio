"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines: Array<Array<{ text: string; italic?: boolean }>> = [
  [{ text: "Développeuse & designer," }],
  [{ text: "je transforme vos idées en" }],
  [
    { text: "expériences",  italic: true },
    { text: " digitales" },
    { text: " mémorables.", italic: true },
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
        background: "var(--background)",
        position: "relative",
        zIndex: 20,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ padding: "7rem clamp(2.5rem, 5vw, 5rem)" }}>
        <p
          style={{
            fontSize: "clamp(2.2rem, 5vw, 5.8rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            color: "var(--foreground)",
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
              background: "var(--foreground)",
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
