import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Statement from "@/components/sections/Statement";
import Works from "@/components/sections/Works";
import Capabilities from "@/components/sections/Capabilities";
import GridProjects from "@/components/sections/GridProjects";
import OtherProjects from "@/components/sections/OtherProjects";
import Footer from "@/components/ui/Footer";
import SplashScreen from "@/components/ui/SplashScreen";
import ThemeSection, { type Theme } from "@/components/ui/ThemeSection";

// Hero light → Featured Works dark → Statement dark → Works dark → Skills & Tools white → Tous les projets dark
const THEMED_SECTIONS: { theme: Theme; node: React.ReactNode }[] = [
  { theme: "light", node: <Hero /> },
  { theme: "dark", node: <Projects /> },
  { theme: "dark", node: <Statement /> },
  { theme: "dark", node: <Works /> },
  { theme: "light", node: <Capabilities /> },
  { theme: "dark", node: <GridProjects /> },
];

export default function Home() {
  return (
    <main>
      <SplashScreen />
      {THEMED_SECTIONS.map(({ theme, node }, i) => (
        <ThemeSection key={i} theme={theme} from={THEMED_SECTIONS[i - 1]?.theme ?? theme}>
          {node}
        </ThemeSection>
      ))}
      <OtherProjects />
      <Footer />
    </main>
  );
}
