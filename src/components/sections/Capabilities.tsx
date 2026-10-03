"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects, otherProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type CapRow = {
  id: string;
  title: string;
  tools: string[];
};

const capabilities: CapRow[] = [
  {
    id: "01",
    title: "Design & Branding",
    tools: ["Photoshop", "InDesign", "Illustrator", "Premiere", "Figma", "Canva", "Procreate"],
  },
  {
    id: "02",
    title: "Front-end",
    tools: ["Angular", "React", "JavaScript", "GSAP"],
  },
  {
    id: "03",
    title: "Back-end",
    tools: ["Spring Boot", "Node.js"],
  },
  {
    id: "04",
    title: "Base de données",
    tools: ["PostgreSQL", "MongoDB", "AS400"],
  },
  {
    id: "05",
    title: "CMS & No-code",
    tools: ["WordPress", "Webflow"],
  },
  {
    id: "06",
    title: "Workflow",
    tools: ["Git", "GitHub"],
  },
  {
    id: "07",
    title: "Outils",
    tools: ["Jenkins", "N8N", "Keycloak", "Graylog", "Docker", "Notion", "Jira", "Teams"],
  },
  {
    id: "08",
    title: "IA",
    tools: ["Claude Code"],
  },
];

// Every image of every project - full galleries, not just a "02"/"03"
// sample - one project after another, then the whole sequence loops. Not
// capped at 4: the stack keeps cycling through it for as long as a row
// stays hovered, so it never feels like it runs out or stalls.
const cycleImages: string[] = [
  ...allProjects.flatMap((p) => [p.image, ...(p.images ?? [])]),
  ...otherProjects.map((p) => p.image),
].filter((src): src is string => Boolean(src));

const STACK_W = 220;
const STACK_H = 160;
const START_DELAY_MS = 140; // the row stays empty this long before the stack appears
// Each of the 5 layers swaps its own image on this period, but their swaps
// are staggered by a fifth of it - so at any instant exactly one layer is
// mid-crossfade while the other four sit fully visible. Nothing ever
// freezes-then-jumps as a synced batch; the stack is always quietly moving.
const CYCLE_INTERVAL_MS = 950;
// Touch screens have no hover-out to end the stack - a tap lands this many
// images (1-5) one after another, holds briefly, then the whole stack fades
// out at once. No cycling on touch.
const TOUCH_MAX_IMAGES = 6;
const TOUCH_HOLD_S = 0.5;

// Same test as the custom cursor's CSS (globals.css): anything that isn't a
// real mouse is treated as touch.
const isTouch = () => !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);
  const topRef = useRef<HTMLImageElement>(null);
  const bottomRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);

  // The stack only exists in the DOM while the entry delay has fully
  // elapsed - nothing to hide/fade-leak because there's nothing rendered
  // in between. It's keyed off the whole section, not individual rows, so
  // moving the cursor around inside the section never stops the cycle.
  const [isActive, setIsActive] = useState(false);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Each layer owns its own cursor into the shared image sequence, advancing
  // by 5 (one per layer) each swap so the 5 layers never show the same image
  // at once.
  const cursorsRef = useRef<number[]>([0, 1, 2, 3, 4]);
  const layerTimersRef = useRef<Array<ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>>>([]);

  // Scroll reveal for the rows - unrelated to the hover preview below
  useEffect(() => {
    const ctx = gsap.context(() => {
      capabilities.forEach((_, i) => {
        gsap.fromTo(
          `.cap-row-${i}`,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.cap-row-${i}`,
              start: "top 78%",
              end: "top 42%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Drives the stack: once mounted (the entry delay has elapsed) it builds
  // up one layer at a time - bottom → top → left+right → front - then each
  // of the 5 layers starts its own continuous, staggered crossfade loop that
  // keeps running for as long as the section stays hovered, looping through
  // the shared image sequence with no synchronized pause.
  useEffect(() => {
    if (!isActive || !stackRef.current) return;

    const layers = [bottomRef.current, topRef.current, leftRef.current, rightRef.current, frontRef.current];
    const n = cycleImages.length;
    cursorsRef.current = [0, 1, 2, 3, 4];
    layers.forEach((el, i) => {
      if (el) el.src = cycleImages[cursorsRef.current[i] % n];
    });

    gsap.set(stackRef.current, { x: mouseRef.current.x, y: mouseRef.current.y, opacity: 1, scale: 1 });
    gsap.set(layers, { opacity: 0, scale: 0.85 });

    const STEP = 0.1;
    const LAND = { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" };

    if (isTouch()) {
      const touchTl = gsap.timeline({ onComplete: () => setIsActive(false) });
      layers.slice(0, TOUCH_MAX_IMAGES).forEach((el, i) => touchTl.to(el, LAND, i * 0.15));
      touchTl.to(
        stackRef.current,
        { opacity: 0, scale: 0.9, duration: 0.35, ease: "power2.in" },
        `+=${TOUCH_HOLD_S}`
      );
      return () => {
        touchTl.kill();
      };
    }

    const entrance = gsap.timeline();
    entrance
      .to(bottomRef.current, LAND, 0)
      .to(topRef.current, LAND, STEP)
      .to([leftRef.current, rightRef.current], LAND, STEP * 2)
      .to(frontRef.current, LAND, STEP * 3);

    const startLayerLoop = (el: HTMLImageElement | null, i: number) => {
      if (!el) return;
      const id = setInterval(() => {
        cursorsRef.current[i] += 5;
        const nextSrc = cycleImages[cursorsRef.current[i] % n];
        gsap.to(el, {
          opacity: 0.25,
          scale: 0.95,
          duration: 0.18,
          ease: "power1.in",
          onComplete: () => {
            el.src = nextSrc;
            gsap.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
          },
        });
      }, CYCLE_INTERVAL_MS);
      layerTimersRef.current.push(id);
    };

    const staggerDelay = CYCLE_INTERVAL_MS / layers.length;
    layers.forEach((el, i) => {
      const t = setTimeout(() => startLayerLoop(el, i), 500 + i * staggerDelay);
      layerTimersRef.current.push(t);
    });

    return () => {
      entrance.kill();
      layerTimersRef.current.forEach((t) => {
        clearInterval(t);
        clearTimeout(t);
      });
      layerTimersRef.current = [];
      gsap.killTweensOf(layers);
    };
  }, [isActive]);

  // Attached to the whole section, not individual rows, so crossing from
  // one row to another never fires this again - only entering/leaving the
  // section itself does.
  const activate = (e: React.MouseEvent<HTMLElement>) => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    mouseRef.current = { x: e.clientX, y: e.clientY };

    pendingRef.current = setTimeout(() => {
      pendingRef.current = null;
      setIsActive(true);
    }, START_DELAY_MS);
  };

  // On touch, the emulated mouseenter only fires on the first tap into the
  // section - taps drive the stack instead, so it can restart after closing.
  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isTouch()) activate(e);
  };

  const handleTap = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch() && !isActive && !pendingRef.current) activate(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (stackRef.current) {
      gsap.to(stackRef.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power3.out" });
    }
  };

  const handleLeave = () => {
    if (pendingRef.current) {
      clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleTap}
      style={{
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div
        style={{
          padding: "7rem clamp(2.5rem, 5vw, 5rem) 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            marginBottom: "1.2rem",
          }}
        >
          Compétences &amp; Outils
        </p>
        <h2 className="heading-lg" style={{ color: "var(--foreground)" }}>
          Savoir-faire
        </h2>
      </div>

      {/* ── Rows ─────────────────────────────────────────────── */}
      {capabilities.map((cap, i) => (
        <div
          key={cap.id}
          className={`cap-row cap-row-${i}`}
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(3rem,6vw,6rem) 1fr 1fr",
            alignItems: "baseline",
            gap: "clamp(1rem, 3vw, 3rem)",
            padding: "clamp(2rem, 3.5vw, 3.5rem) clamp(2.5rem, 5vw, 5rem)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Number */}
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              paddingTop: "0.2rem",
            }}
          >
            {cap.id}
          </span>

          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(1.6rem, 3vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {cap.title}
          </h3>

          {/* Tools */}
          <div className="cap-tools" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 0", alignItems: "center" }}>
            {cap.tools.map((tool, j) => (
              <span
                key={j}
                style={{
                  fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
                  color: "var(--muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {tool}
                {j < cap.tools.length - 1 && (
                  <span style={{ opacity: 0.3, margin: "0 0.6rem" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* ── Hover preview stack - only exists in the DOM once the delay has
           elapsed for the hovered row, follows the cursor while it's active ── */}
      {isActive && (
        <div
          ref={stackRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: STACK_W,
            height: STACK_H,
            marginLeft: -STACK_W / 2,
            marginTop: -STACK_H / 2,
            opacity: 0,
            transformOrigin: "center center",
            pointerEvents: "none",
            zIndex: 9000,
          }}
        >
          {/* top */}
          <img
            ref={topRef}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translateY(-18%)",
              zIndex: 1,
            }}
          />
          {/* bottom */}
          <img
            ref={bottomRef}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translateY(18%)",
              zIndex: 1,
            }}
          />
          {/* left */}
          <img
            ref={leftRef}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translateX(-18%)",
              zIndex: 2,
            }}
          />
          {/* right */}
          <img
            ref={rightRef}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translateX(18%)",
              zIndex: 2,
            }}
          />
          {/* front */}
          <img
            ref={frontRef}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 5,
            }}
          />
        </div>
      )}
    </section>
  );
}
