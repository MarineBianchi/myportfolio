import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

// Monument Grotesk isn't available as a web font license we can ship —
// Hanken Grotesk is the closest free match (same neutral, slightly
// rounded neo-grotesque proportions).
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Marine · Full Stack Developer & Graphic Designer",
  description:
    "Portfolio de Marine, développeuse full stack et graphiste passionnée par les interfaces animées et les expériences visuelles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={hankenGrotesk.className}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
