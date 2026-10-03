"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHOTO_A = "/img/Apropos1.JPG";
const PHOTO_B = "/img/Apropos3.jpg";
const BACKDROP = "/img/fond3.JPG";

// Sticky, not pinned - a GSAP `pin: true` inserts its pin-spacer on a
// deferred frame, not synchronously, so anything else measured in the same
// pass (e.g. a section placed right after it) gets measured short by that
// spacer's height. `position: sticky` needs no spacer and no such
// measurement race: the section is just tall (500vh) and the inner scene
// sticks to the top of the viewport for as long as it's being scrolled
// through, released the moment the section itself runs out.
export default function PhotoShowcase() {
  const wrap = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  // Drives the frame's height directly (see JSX below) instead of through a
  // CSS media query: a `.work-frame { height: auto !important; aspect-ratio:
  // 3/2 !important; }` rule was silently dropped by the build's CSS
  // minifier (Lightning CSS) while an identical sibling rule in the same
  // block survived - not worth chasing further when the inline style is
  // just as reliable and matches the pattern already used for reducedMotion.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The section's height depends on isMobile - every trigger below it
  // (and this one) has to be re-measured once it changes.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.set(a.current, { scale: 1.8 });
      // B appears already at the "whole photo" scale - matching where the
      // frame is at the cut - so from the moment it's visible its scale
      // only ever climbs toward the close-up, never dips first.
      gsap.set(b.current, { autoAlpha: 0, scale: 1.0 });
      gsap.set(bg.current, { scale: 1.5 });

      const R = { immediateRender: false };
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          // useGSAP creates this trigger in a layout effect - before the
          // Statement section above has created its pin (plain effect).
          // Refreshing in creation order would measure this start without
          // that pin's spacer, ~1100px too early, so the sequence ran ahead
          // of the scroll (on mobile it had already finished on arrival).
          // A lower priority makes it refresh after every pin above it.
          refreshPriority: -1,
        },
      });

      tl
        // 0 → 0.10 : pause, A en plein écran
        // 0.10 → 0.30 : le cadre rétrécit en un seul mouvement jusqu'à sa
        // taille minimale - toute la réduction se fait pendant que A est
        // encore visible, pas après l'arrivée de B.
        .fromTo(frame.current, { "--s": 1 }, { "--s": 0.6, duration: 0.2, ...R }, 0.1)
        .fromTo(a.current, { scale: 1.8 }, { scale: 1.0, duration: 0.2, ...R }, 0.1)
        .fromTo(bg.current, { scale: 1.5 }, { scale: 1.0, duration: 0.2, ...R }, 0.1)
        // 0.30 : coupe nette A → B, cadre déjà à sa taille minimale - aucun
        // mouvement du cadre à cet instant.
        .set(a.current, { autoAlpha: 0 }, 0.3)
        .set(b.current, { autoAlpha: 1 }, 0.3)
        // 0.30 → 0.42 : pause, petite carte, photo B entière visible
        // 0.42 → 0.68 : le cadre regrandit jusqu'au plein écran - B ne fait
        // que zoomer à partir d'ici, jamais de recul.
        .fromTo(frame.current, { "--s": 0.6 }, { "--s": 1, duration: 0.26, ...R }, 0.42)
        .fromTo(b.current, { scale: 1.0 }, { scale: 1.8, duration: 0.26, ...R }, 0.42)
        .fromTo(bg.current, { scale: 1.0 }, { scale: 1.5, duration: 0.26, ...R }, 0.42);
      // La timeline s'arrête à 0.68 : le scrub l'étire sur toute la section,
      // donc pas de pause finale - B atteint le plein écran en fin de section.
    },
    { scope: wrap, dependencies: [reducedMotion] }
  );

  if (reducedMotion) {
    return (
      <section className="relative h-lvh" style={{ zIndex: 20 }}>
        <Image src={PHOTO_B} alt="" fill sizes="100vw" priority className="object-cover" />
      </section>
    );
  }

  return (
    <section
      ref={wrap}
      id="works"
      className="relative"
      // Every other themed section on the page sits at z-index 20 - kept
      // here too so this section reliably wins any stacking tie against the
      // pinned Statement section right above it.
      // Half the scroll distance on mobile - the same sequence, fewer swipes.
      style={{ height: isMobile ? "250vh" : "500vh", zIndex: 20 }}
    >
      <div className="sticky top-0 h-lvh overflow-hidden">
        <div ref={bg} className="absolute inset-0 will-change-transform">
          <Image src={BACKDROP} alt="" fill sizes="100vw" priority className="object-cover" />
        </div>
        <div
          ref={frame}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.35)]"
          style={
            {
              ["--s" as string]: 1,
              // Mobile keeps a 1rem gutter each side even at full size, so
              // the photo never touches the phone's edges.
              width: isMobile ? "calc(var(--s) * (100vw - 2rem))" : "calc(var(--s) * 100vw)",
              // Both photos are ~3:2 landscape - on a portrait phone,
              // `--s * 100svh` is far taller than that ratio needs, leaving
              // a big empty letterboxed band above/below the (object-contain)
              // image inside the frame. Mobile instead derives height from
              // the frame's own (still --s-animated) width at that ratio,
              // so it hugs the photo with no dead space.
              height: isMobile ? "auto" : "calc(var(--s) * 100svh)",
              aspectRatio: isMobile ? "3 / 2" : undefined,
            } as CSSProperties
          }
        >
          <div ref={a} className="absolute inset-0 will-change-transform">
            <Image src={PHOTO_A} alt="" fill sizes="100vw" priority className="object-cover work-img" />
          </div>
          <div ref={b} className="absolute inset-0 will-change-transform">
            <Image src={PHOTO_B} alt="" fill sizes="100vw" className="object-cover work-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
