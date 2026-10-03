import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

// Monument Grotesk isn't available as a web font license we can ship -
// Hanken Grotesk is the closest free match (same neutral, slightly
// rounded neo-grotesque proportions).
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://marinebianchi.com";
const SITE_NAME = "Marine Bianchi";
const DESCRIPTION =
  "Marine Bianchi, développeuse full stack et designer graphique basée en France. Portfolio de sites web, identités visuelles et expériences interactives animées (GSAP, Next.js, Webflow).";

// Link previews (WhatsApp, LinkedIn, Slack...) use the site's own voice;
// the search title above keeps the role keywords.
const SHARE_TITLE = `${SITE_NAME} - Design & développement web`;
const SHARE_DESCRIPTION =
  "Du croquis au code : je crée des identités visuelles, des sites et des applications qui vous ressemblent. Designer graphique et développeuse full stack, basée en France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Développeuse Full Stack & Designer Graphique`,
    template: `%s - ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Marine Bianchi",
    "développeuse web",
    "développeuse full stack",
    "designer graphique",
    "identité visuelle",
    "portfolio développeuse",
    "développement web France",
    "UI UX design",
    "Webflow",
    "Next.js",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
};

// Person schema: ties the site to Marine as an entity (name, role, socials)
// for Google's knowledge graph / rich results - independent of any one page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Développeuse Full Stack & Designer Graphique",
  description: DESCRIPTION,
  sameAs: [
    "https://www.linkedin.com/in/mbian/",
    "https://www.instagram.com/its.m.work/",
    "https://github.com/MarineBianchi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={hankenGrotesk.className}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
