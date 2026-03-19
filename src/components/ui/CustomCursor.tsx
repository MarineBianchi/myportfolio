"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CIRCLE_SIZE = 56;
// Dot position within the circle (SVG centered inside 56×56):
// SVG top offset = (56-46)/2 = 5px, dot y in SVG ≈ 41px → total = 46px
const DOT_Y = 46;

export default function CustomCursor() {
  const nRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const n = nRef.current;
    if (!n) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(n, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power3.out" });
    };

    // Clickable or view → white "n" on black circle
    const onEnterActive = () => {
      gsap.to(n, { backgroundColor: "var(--foreground)", color: "var(--background)", duration: 0.25, ease: "power2.out" });
    };
    const onLeaveActive = () => {
      gsap.to(n, { backgroundColor: "transparent", color: "var(--foreground)", duration: 0.25, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    const activeEls = document.querySelectorAll("a, button, [data-cursor='view'], [role='button']");
    activeEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterActive);
      el.addEventListener("mouseleave", onLeaveActive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      activeEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterActive);
        el.removeEventListener("mouseleave", onLeaveActive);
      });
    };
  }, []);

  return (
    <div
      ref={nRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: "var(--foreground)",
        // Offset so the dot under the "n" aligns with the cursor
        marginLeft: -(CIRCLE_SIZE / 2),
        marginTop: -DOT_Y,
      }}
    >
      <svg
        width="22"
        height="46"
        viewBox="37.5 1 14 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.57,20.85V8.03c0-1.84,.56-3.35,1.67-4.51,1.11-1.16,2.55-1.75,4.32-1.75s3.21,.58,4.32,1.75c1.11,1.17,1.67,2.67,1.67,4.51v12.82c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54V7.91c0-.92-.24-1.66-.71-2.21-.47-.55-1.13-.83-1.98-.83s-1.5,.28-1.98,.83c-.47,.55-.71,1.29-.71,2.21v12.94c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54Z"
          fill="currentColor"
        />
        <path
          d="M43.11,28.2c-.37-.37-.56-.84-.56-1.4s.19-1.07,.56-1.44,.84-.56,1.4-.56,1.04,.19,1.42,.58c.38,.38,.58,.86,.58,1.42,0,.51-.2,.97-.6,1.36-.4,.4-.86,.6-1.4,.6s-1.03-.19-1.4-.56Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
