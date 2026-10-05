"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstPathRef = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for use in other components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as { lenis?: any }).lenis = lenis;

    // Keep ScrollTrigger (pin/scrub) in sync with Lenis's smoothed scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // A pinned ScrollTrigger (e.g. Statement's text reveal) defers its own
    // pin-spacer's DOM insertion to the next frame rather than doing it
    // synchronously inside ScrollTrigger.create(). Any trigger created right
    // below it in the same pass - e.g. Works' entrance/pin - gets measured
    // against a page that's still short by that spacer's height, and a
    // same-tick refresh() doesn't fix it because the spacer still isn't
    // there yet. One refresh here, after the whole tree has committed and
    // deferred far enough past it (double rAF) for every pin's spacer to
    // have actually landed, re-measures everything against the real layout.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Lenis keeps its own scroll target across client-side navigations: a
  // wheel/trackpad scroll still easing out when a project is clicked (or
  // one made while ProjectLink's transition covers the screen) carries the
  // home page's far-down target over, and the new page opens on its footer.
  // Every new page starts at the top instead (scrollToSection's own scroll
  // runs later, so "back to a section" links still land where they aim).
  useEffect(() => {
    if (firstPathRef.current) {
      firstPathRef.current = false;
      return;
    }
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.start();
  }, [pathname]);

  return <>{children}</>;
}
