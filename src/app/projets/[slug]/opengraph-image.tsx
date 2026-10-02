import { ImageResponse } from "next/og";
import { allProjects, getProjectBySlug } from "@/data/projects";

export const dynamic = "force-static";
export const alt = "Marine Bianchi - projet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#111111",
          color: "#f8f7f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#f8f7f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111111",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            n
          </div>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600 }}>
            Marine Bianchi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {project && (
            <div style={{ display: "flex", fontSize: 24, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {project.category} · {project.year}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {project ? project.title : "Projet"}
          </div>
          {project && (
            <div style={{ display: "flex", fontSize: 26, color: "#b5b5b5", maxWidth: 900 }}>
              {project.tagline}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
