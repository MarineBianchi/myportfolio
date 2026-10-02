import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marine Bianchi — Développeuse Full Stack & Designer Graphique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#f8f7f4",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f8f7f4",
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

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 950,
            }}
          >
            Développeuse Full Stack &amp; Designer Graphique
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#7a7a7a", maxWidth: 850 }}>
            Sites web, identités visuelles et expériences interactives animées.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
