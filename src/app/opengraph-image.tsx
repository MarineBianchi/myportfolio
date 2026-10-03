import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Marine Bianchi - Design & développement web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview card (WhatsApp, LinkedIn, Slack...): same dark palette,
// font and logo as the site, with the hero portrait on the right.
export default async function Image() {
  const root = process.cwd();
  const [regular, semibold, logoSvg, portrait] = await Promise.all([
    readFile(join(root, "src/app/fonts/hanken-grotesk-400.woff")),
    readFile(join(root, "src/app/fonts/hanken-grotesk-600.woff")),
    readFile(join(root, "public/videos/logo.svg"), "utf8"),
    readFile(join(root, "public/img/m2.png")),
  ]);

  // The logo's letters are mid-gray and its "n" mark has no fill (black
  // by default) - both recolored to the site's off-white for the dark card.
  const logo = `data:image/svg+xml;base64,${Buffer.from(
    logoSvg.replace(/#bcbcbc/gi, "#f8f7f4").replace("<svg ", '<svg fill="#f8f7f4" ')
  ).toString("base64")}`;
  const photo = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#111111",
          color: "#f8f7f4",
          fontFamily: "Hanken Grotesk",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px 64px 80px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" height={40} width={(87.78 / 34.9) * 40} />

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(248,247,244,0.55)",
              }}
            >
              Du croquis au code
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 54,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Je crée des identités visuelles, des sites et des applications qui vous ressemblent.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              color: "rgba(248,247,244,0.55)",
            }}
          >
            <span style={{ color: "#f8f7f4", fontWeight: 600 }}>Marine Bianchi</span>
            <span>·</span>
            <span>Design &amp; développement web</span>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={420}
          height={630}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Hanken Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Hanken Grotesk", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
