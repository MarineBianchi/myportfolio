"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LEFT_CLOSED = "inset(0% 100% 0% 0%)";
const RIGHT_CLOSED = "inset(0% 0% 0% 100%)";
const OPEN = "inset(0% 0% 0% 0%)";

// Wraps any children marked data-reveal="left" / "right" and, the one time
// this block enters the viewport, clip-path-reveals them from their outer
// edge toward the center while the whole block rises into place. Time-based
// (not scrubbed), plays once - not a layout component, just the animation.
//
// The trigger is an IntersectionObserver, not a GSAP ScrollTrigger position
// - deliberately. Other components on the same project page (e.g. a pinned
// scroll-reveal text block) insert a pin spacer into the DOM that isn't
// always there yet when a ScrollTrigger below it gets measured, leaving it
// permanently short by that spacer's height - even an explicit, later
// ScrollTrigger.refresh() doesn't correct it. An IntersectionObserver reads
// the browser's live layout directly instead of caching an absolute pixel
// position, so it can't go stale this way.
export default function RevealImages({
  children,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const left = gsap.utils.toArray<HTMLElement>('[data-reveal="left"]', el);
      const right = gsap.utils.toArray<HTMLElement>('[data-reveal="right"]', el);
      if (!el || (!left.length && !right.length)) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...left, ...right], { clipPath: OPEN });
        return;
      }

      const tl = gsap.timeline({ paused: true, defaults: { duration: 1.2, ease: "expo.out" } });
      tl.fromTo(left, { clipPath: LEFT_CLOSED }, { clipPath: OPEN }, 0)
        .fromTo(right, { clipPath: RIGHT_CLOSED }, { clipPath: OPEN }, 0)
        .fromTo(el, { y: "35vh" }, { y: 0 }, 0);

      // Roughly mirrors ScrollTrigger's "top 88%": fires once the block has
      // entered the bottom ~12% strip of the viewport.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          tl.play();
          io.disconnect();
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0 }
      );
      io.observe(el);

      return () => io.disconnect();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} style={{ willChange: "transform", ...style }} {...rest}>
      {children}
    </div>
  );
}
