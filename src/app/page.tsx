import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Statement from "@/components/sections/Statement";
import Capabilities from "@/components/sections/Capabilities";
import GridProjects from "@/components/sections/GridProjects";
import OtherProjects from "@/components/sections/OtherProjects";
import Footer from "@/components/ui/Footer";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
  return (
    <main>
      <SplashScreen />
      <Hero />
      <Projects />
      <Statement />
      <Capabilities />
      <GridProjects />
      <OtherProjects />
      <Footer />
    </main>
  );
}
