"use client";

import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import { gsap } from "gsap";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ProjectLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
  };

const LANDING_SELECTOR = "[data-hero-media]";
const LANDING_TIMEOUT_MS = 1500;
const FALLBACK_FILL = "#111111";

// Waits (briefly) for the destination page to have mounted its hero before
// revealing it, so the reveal doesn't land on a blank page.
function waitForDestination(): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      if (document.querySelector(LANDING_SELECTOR) || performance.now() - start > LANDING_TIMEOUT_MS) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// Clicking a project link grows the (already black, already under the
// pointer) custom cursor circle until it swallows the whole screen, swaps
// the route underneath it, then simply dissolves - it opens onto the new
// page and stays open, it never closes back down.
export default function ProjectLink({ children, href, onClick, ...rest }: ProjectLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Only hijack plain left-clicks - let cmd/ctrl/middle-click open in a new tab normally
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const cursor = document.getElementById("site-cursor");
    // #site-cursor is always mounted, so checking for its existence never
    // actually detects touch - it has to be a real capability check. On
    // touch the element is hidden via CSS and never positioned, so using
    // its (stale, 0,0) rect would make the transition expand from the
    // wrong corner instead of falling back to normal navigation.
    const hasCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!cursor || !hasCustomCursor) return;

    e.preventDefault();

    // No scrolling while the circle covers the screen - SmoothScroll
    // restarts it once the new page has mounted.
    (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();

    const rect = cursor.getBoundingClientRect();
    const fill = getComputedStyle(cursor).backgroundColor;
    const isFilled = fill && fill !== "transparent" && fill !== "rgba(0, 0, 0, 0)";

    const circle = document.createElement("div");
    circle.style.position = "fixed";
    circle.style.top = `${rect.top}px`;
    circle.style.left = `${rect.left}px`;
    circle.style.width = `${rect.width}px`;
    circle.style.height = `${rect.height}px`;
    circle.style.borderRadius = "999px";
    circle.style.background = isFilled ? fill : FALLBACK_FILL;
    circle.style.zIndex = "100000";
    circle.style.pointerEvents = "none";
    document.body.appendChild(circle);

    // Hide the real cursor while its stand-in takes over the screen.
    cursor.style.opacity = "0";

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );
    const base = Math.max(rect.width, rect.height);
    const scale = ((maxRadius * 2) / base) * 1.1;

    const cleanup = () => {
      circle.remove();
      cursor.style.opacity = "1";
    };

    gsap.to(circle, {
      scale,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href.toString());
        void waitForDestination().then(() => {
          gsap.to(circle, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: cleanup,
          });
        });
      },
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
