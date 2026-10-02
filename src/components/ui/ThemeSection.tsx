"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Theme = "light" | "dark";

export const PALETTE: Record<
  Theme,
  { background: string; foreground: string; muted: string; border: string }
> = {
  light: {
    background: "#f8f7f4",
    foreground: "#111111",
    muted: "#7a7a7a",
    border: "#e3e2dc",
  },
  dark: {
    background: "#111111",
    foreground: "#f8f7f4",
    muted: "rgba(248,247,244,0.55)",
    border: "rgba(255,255,255,0.14)",
  },
};

// Wraps a section and smoothly crossfades the page background from the
// previous section's theme color to its own as it scrolls into view —
// the color finishes resolving right as the section fills the viewport,
// so the seam with the section above/below is invisible.
export default function ThemeSection({
  theme,
  from,
  children,
  id,
}: {
  theme: Theme;
  from: Theme;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = PALETTE[theme];
  const fromColor = PALETTE[from].background;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { backgroundColor: fromColor },
        {
          backgroundColor: colors.background,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [colors.background, fromColor]);

  return (
    <div
      ref={ref}
      id={id}
      data-cursor-theme={theme}
      style={
        {
          "--background": colors.background,
          "--foreground": colors.foreground,
          "--muted": colors.muted,
          "--border": colors.border,
          position: "relative",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
