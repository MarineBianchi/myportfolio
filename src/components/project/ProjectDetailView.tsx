"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MediaItem, Project } from "@/data/projects";
import ScrollColorText from "@/components/project/ScrollColorText";
import RevealImages from "@/components/project/RevealImages";
import Footer from "@/components/ui/Footer";
import { PALETTE } from "@/components/ui/ThemeSection";
import { scrollToSection } from "@/lib/scrollToSection";

gsap.registerPlugin(ScrollTrigger);

type Media = MediaItem;

// Explicit order wins when set (a project's video doesn't always come
// first); otherwise fall back to video first, then image + images.
function buildMedia(project: Project): Media[] {
  if (project.media) return project.media;
  const stillImages = project.image
    ? [project.image, ...(project.images ?? [])]
    : (project.images ?? []);
  return [
    ...(project.video ? [{ type: "video" as const, src: project.video }] : []),
    ...stillImages.map((src) => ({ type: "image" as const, src })),
  ];
}

// Every photo/video on the page uses this one treatment - same layout as
// the "Tous les projets" mosaic: a half-width image at its real ratio
// (never cropped), alternating left/right. The entrance is a clip-path
// reveal from the outer edge toward the center (see RevealImages) - the
// image/video itself never scales or translates, only its mask does.
function MediaBlock({
  media,
  title,
  index,
  isFirst,
}: {
  media: Media;
  title: string;
  index: number;
  isFirst?: boolean;
}) {
  const alignRight = index % 2 === 1;

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    // Already clipped in CSS so there's nothing to flash before the
    // animation (or the reduced-motion check) takes over.
    clipPath: alignRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    willChange: "transform, clip-path",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: alignRight ? "flex-end" : "flex-start",
        padding: "0 clamp(2.5rem, 5vw, 5rem)",
        marginTop: isFirst ? 0 : "clamp(5rem, 10vh, 8rem)",
      }}
    >
      <RevealImages
        data-hero-media={isFirst ? true : undefined}
        style={{
          // Videos are screen recordings - at half width their detail is
          // unreadable, so they get most of the page width instead.
          width:
            media.type === "video"
              ? "clamp(280px, 75vw, 1200px)"
              : "clamp(240px, 38vw, 580px)",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {media.type === "video" ? (
          <video
            data-reveal={alignRight ? "right" : "left"}
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            tabIndex={-1}
            style={mediaStyle}
          />
        ) : (
          <img
            data-reveal={alignRight ? "right" : "left"}
            src={media.src}
            alt={title}
            style={mediaStyle}
          />
        )}
      </RevealImages>
    </div>
  );
}

function PdfBlock({ pdf }: { pdf: NonNullable<Project["pdf"]> }) {
  return (
    <div
      style={{
        padding: "0 clamp(2.5rem, 5vw, 5rem)",
        marginTop: "clamp(5rem, 10vh, 8rem)",
      }}
    >
      <div style={{ width: "clamp(240px, 28vw, 420px)", maxWidth: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--muted)",
            }}
          >
            {pdf.label}
          </span>
          <a
            href={pdf.src}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--foreground)",
              textDecoration: "none",
            }}
          >
            Ouvrir le PDF ↗
          </a>
        </div>
        <iframe
          src={`${pdf.src}#view=FitH`}
          title={pdf.label}
          style={{
            width: "100%",
            height: "clamp(300px, 45vh, 520px)",
            border: "1px solid var(--border)",
            display: "block",
            background: "var(--background)",
          }}
        />
      </div>
    </div>
  );
}

function ComingSoonBlock({ project }: { project: Project }) {
  return (
    <div style={{ display: "flex", padding: "0 clamp(2.5rem, 5vw, 5rem)" }}>
      <div
        data-hero-media
        style={{
          width: "clamp(240px, 38vw, 580px)",
          maxWidth: "100%",
          height: "clamp(220px, 32vw, 420px)",
          background: project.tint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--foreground)",
          }}
        >
          Bientôt disponible
        </span>
      </div>
    </div>
  );
}

function Hero({ project }: { project: Project }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ padding: "6.5rem clamp(2.5rem, 5vw, 5rem) 0" }}>
        <button
          onClick={() => scrollToSection(router, "#grid-projects")}
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--muted)",
            textDecoration: "none",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          ← Tous les projets
        </button>
      </div>

      <div
        style={{
          padding: "2.5rem clamp(2.5rem, 5vw, 5rem) 0",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1.5rem",
          overflow: "hidden",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontWeight: 600,
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--foreground)",
            // Flex items default to a min-width that matches their content,
            // which fights the row's `overflow: hidden` on a long title at
            // narrow widths - let it actually shrink/wrap instead of
            // getting clipped against the non-shrinking id badge.
            minWidth: 0,
            overflowWrap: "break-word",
          }}
        >
          {project.title}
        </h1>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            color: "var(--muted)",
            flexShrink: 0,
          }}
        >
          {project.id}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: "1.5rem clamp(2.5rem, 5vw, 5rem) 3.5rem",
          gap: "2rem",
        }}
      >
        <div>
          {project.deliverables && project.deliverables.length > 0 ? (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                columnGap: "0.6rem",
                rowGap: "0.3rem",
                fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
                color: "var(--muted)",
                maxWidth: "40rem",
              }}
            >
              {project.deliverables.map((item, i) => (
                <li key={item} style={{ display: "flex", gap: "0.6rem" }}>
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {project.stack && project.stack.length > 0 && (
            <p
              style={{
                margin: "1rem 0 0",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                lineHeight: 1.8,
                color: "var(--muted)",
                maxWidth: "40rem",
              }}
            >
              Stack : {project.stack.join(" · ")}
            </p>
          )}
        </div>
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--muted)",
            whiteSpace: "nowrap",
          }}
        >
          {project.category} · {project.year}
        </span>
      </div>
    </div>
  );
}

export default function ProjectDetailView({ project }: { project: Project }) {
  const media = buildMedia(project);
  const [first, ...rest] = media;

  return (
    <main
      data-cursor-theme="dark"
      style={
        {
          "--background": PALETTE.dark.background,
          "--foreground": PALETTE.dark.foreground,
          "--muted": PALETTE.dark.muted,
          "--border": PALETTE.dark.border,
          background: "var(--background)",
        } as CSSProperties
      }
    >
      <Hero project={project} />

      {first ? (
        <MediaBlock media={first} title={project.title} index={0} isFirst />
      ) : (
        <ComingSoonBlock project={project} />
      )}

      <ScrollColorText text={project.description} />

      {rest.map((item, i) => (
        <MediaBlock key={item.src} media={item} title={project.title} index={i + 1} />
      ))}

      {project.pdf && <PdfBlock pdf={project.pdf} />}

      <div style={{ height: "clamp(4rem, 10vh, 8rem)" }} />

      <Footer />
    </main>
  );
}
