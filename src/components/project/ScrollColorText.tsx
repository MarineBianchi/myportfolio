"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Splits `text` into words that start dim and turn solid (fading in, not
// recoloring, so this reads correctly on both light and dark sections) one
// by one as the section scrolls through the viewport — pinned while it plays.
export default function ScrollColorText({
  text,
  pin = true,
  textStyle,
}: {
  text: string;
  pin?: boolean;
  textStyle?: CSSProperties;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const spans = section.querySelectorAll<HTMLElement>(".rw");

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top+=90",
          end: `+=${Math.max(spans.length * 55, 400)}`,
          scrub: true,
          pin,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [pin]);

  // The outer div is what React mounts/unmounts. GSAP's pin wraps the inner
  // section in a .pin-spacer; without this stable wrapper, React would try
  // to remove the section from a parent it no longer belongs to
  // ("removeChild: The node to be removed is not a child of this node").
  return (
    <div>
      <div
        ref={sectionRef}
        style={{
          minHeight: "60dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem clamp(2.5rem, 8vw, 10rem)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
            lineHeight: 1.4,
            textAlign: "center",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            maxWidth: "56rem",
            margin: 0,
            ...textStyle,
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="rw"
              style={{ color: "var(--foreground)", opacity: 0.15 }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
