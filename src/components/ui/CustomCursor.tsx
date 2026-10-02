"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const CIRCLE_SIZE = 44;
// Reduced logo size, used both for the idle circle and inside the hover pill.
const ICON_W = 15;
const ICON_H = 32;
// The glyph's hotspot (the dot at the bottom of the mark) sits at ~89% of
// its own height - this keeps it pinned under the pointer at any icon size.
const DOT_Y = Math.round((CIRCLE_SIZE - ICON_H) / 2 + 0.891 * ICON_H);
const ACTIVE_SELECTOR = "a, button, [data-cursor='view'], [role='button'], [data-cursor-label]";
// Sentinel value for "show the logo instead of a text label" on hover.
const LOGO_LABEL = "logo";

// The cursor lives outside every section's DOM subtree (mounted once in the
// root layout), so it can't pick up a section's local `--foreground` CSS
// variable override. It looks for the nearest `data-cursor-theme` ancestor
// instead and resolves literal colors itself - this is what keeps the logo
// legible (light glyph on dark sections, dark glyph on light ones) everywhere.
const THEME_COLORS = {
  light: { fg: "#111111", bg: "#f8f7f4" },
  dark: { fg: "#f8f7f4", bg: "#111111" },
} as const;

function LogoGlyph({ width, height }: { width: number; height: number }) {
  return (
    <svg width={width} height={height} viewBox="37.5 1 14 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M38.57,20.85V8.03c0-1.84,.56-3.35,1.67-4.51,1.11-1.16,2.55-1.75,4.32-1.75s3.21,.58,4.32,1.75c1.11,1.17,1.67,2.67,1.67,4.51v12.82c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54V7.91c0-.92-.24-1.66-.71-2.21-.47-.55-1.13-.83-1.98-.83s-1.5,.28-1.98,.83c-.47,.55-.71,1.29-.71,2.21v12.94c0,.36-.18,.54-.54,.54h-2.23c-.36,0-.54-.18-.54-.54Z"
        fill="currentColor"
      />
      <path
        d="M43.11,28.2c-.37-.37-.56-.84-.56-1.4s.19-1.07,.56-1.44,.84-.56,1.4-.56,1.04,.19,1.42,.58c.38,.38,.58,.86,.58,1.42,0,.51-.2,.97-.6,1.36-.4,.4-.86,.6-1.4,.6s-1.03-.19-1.4-.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const nRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [offset, setOffset] = useState({ left: -(CIRCLE_SIZE / 2), top: -DOT_Y });
  const themeRef = useRef<keyof typeof THEME_COLORS>("light");
  const activeRef = useRef(false);
  const pathname = usePathname();

  // A route change unmounts whatever was under the pointer without ever firing
  // a real mouseout, so the hover state (and label) would otherwise stay
  // stuck on screen until the mouse physically moves again.
  useEffect(() => {
    const n = nRef.current;
    if (!n) return;
    activeRef.current = false;
    gsap.set(n, { backgroundColor: "transparent", color: THEME_COLORS[themeRef.current].fg });
    setLabel(null);
  }, [pathname]);

  // Recenter the pill on the pointer whenever its content (icon vs. text,
  // or the text itself) changes size - the idle circle keeps its fixed,
  // hotspot-anchored offset instead.
  useLayoutEffect(() => {
    if (label) {
      const width = contentRef.current?.offsetWidth ?? CIRCLE_SIZE;
      setOffset({ left: -width / 2, top: -(CIRCLE_SIZE / 2) });
    } else {
      setOffset({ left: -(CIRCLE_SIZE / 2), top: -DOT_Y });
    }
  }, [label]);

  useEffect(() => {
    const n = nRef.current;
    if (!n) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(n, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power3.out" });
    };

    const applyColors = () => {
      const { fg, bg } = THEME_COLORS[themeRef.current];
      gsap.to(n, {
        backgroundColor: activeRef.current ? fg : "transparent",
        color: activeRef.current ? bg : fg,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    // Delegated hover detection - works for content added after mount
    // (e.g. client-navigated routes), unlike binding listeners per-element once.
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const themed = el.closest<HTMLElement>("[data-cursor-theme]");
      if (themed) {
        const next = themed.dataset.cursorTheme === "dark" ? "dark" : "light";
        if (next !== themeRef.current) themeRef.current = next;
      }

      const target = el.closest(ACTIVE_SELECTOR);
      const wasActive = activeRef.current;
      activeRef.current = !!target;
      setLabel(target ? (target as HTMLElement).dataset.cursorLabel ?? null : null);

      if (target || wasActive !== activeRef.current || themed) applyColors();
    };

    const onMouseOut = (e: MouseEvent) => {
      const from = (e.target as HTMLElement).closest(ACTIVE_SELECTOR);
      if (!from) return;
      const to = (e.relatedTarget as HTMLElement | null)?.closest(ACTIVE_SELECTOR);
      if (to === from) return;
      activeRef.current = false;
      setLabel(null);
      applyColors();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={nRef}
      id="site-cursor"
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        minWidth: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        padding: label ? "0 1.1rem" : 0,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: THEME_COLORS.light.fg,
        // Offset so the cursor stays centered on the pointer
        marginLeft: offset.left,
        marginTop: offset.top,
        transition: "margin 0.25s ease",
      }}
    >
      <div ref={contentRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {label === LOGO_LABEL ? (
          <LogoGlyph width={ICON_W} height={ICON_H} />
        ) : label ? (
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        ) : (
          <LogoGlyph width={ICON_W} height={ICON_H} />
        )}
      </div>
    </div>
  );
}
