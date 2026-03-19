"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const view = viewRef.current;
    if (!dot || !ring || !view) return;

    // ── Track mouse ───────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(dot,  { x, y, duration: 0.08, ease: "power3.out" });
      gsap.to(ring, { x, y, duration: 0.38, ease: "power3.out" });
      gsap.to(view, { x, y, duration: 0.22, ease: "power3.out" });
    };

    // ── Default link / button hover ───────────────────────────
    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(dot,  { scale: 0, duration: 0.3 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.3 });
    };

    // ── "VIEW" cursor ─────────────────────────────────────────
    const onEnterView = () => {
      gsap.to(dot,  { scale: 0, duration: 0.25 });
      gsap.to(ring, { scale: 0, opacity: 0, duration: 0.25 });
      gsap.to(view, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" });
    };
    const onLeaveView = () => {
      gsap.to(view, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Regular interactive elements
    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // "VIEW" trigger — applied to elements with data-cursor="view"
    const viewEls = document.querySelectorAll("[data-cursor='view']");
    viewEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterView);
      el.addEventListener("mouseleave", onLeaveView);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      viewEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterView);
        el.removeEventListener("mouseleave", onLeaveView);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 8, height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--foreground)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none border"
        style={{
          zIndex: 9998,
          width: 36, height: 36,
          borderRadius: "50%",
          borderColor: "var(--foreground)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* VIEW label */}
      <div
        ref={viewRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 84, height: 84,
          borderRadius: "50%",
          background: "var(--foreground)",
          color: "var(--background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      >
        VIEW&nbsp;→
      </div>
    </>
  );
}
