import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { ProgressRingMenu } from "@/components/ProgressRingMenu";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  useLenis();
  const [booted, setBooted] = useState(false);

  // Lock scroll while booting
  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <>
      {!booted && <LoadingScreen onDone={() => setBooted(true)} />}
      <main className="relative bg-background text-foreground">
        <SiteHeader />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Certifications />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
        <SiteFooter />
        <ProgressRingMenu />
      </main>
    </>
  );
};

export default Index;
