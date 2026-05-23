import { Section, SectionHeader, Reveal } from "./Section";
import { PROFILE, LEADERSHIP } from "@/lib/portfolio-data";

export function About() {
  return (
    <Section id="about">
      <SectionHeader index="02" kicker="About" title="Becoming a cybersecurity lawyer and forensics expert witness." />

      <div className="grid gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-3 space-y-5">
          <p className="text-md text-foreground">{PROFILE.bio}</p>
          <p className="text-muted-foreground">{PROFILE.frustration}</p>
          <p className="text-muted-foreground">{PROFILE.fix}</p>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <div className="surface p-6">
            <p className="eyebrow mb-4">At a glance</p>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Alias</span><span className="text-foreground text-right">The CyGirl</span></li>
              <li className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Focus</span><span className="text-foreground text-right">Cybersecurity · Digital Forensics · Muslim Women in Tech</span></li>
              <li className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Mission</span><span className="text-foreground text-right">Advancing cybersecurity, digital forensics and Muslim women in tech</span></li>
              <li className="flex justify-between gap-4"><span className="text-muted-foreground">Location</span><span className="text-foreground text-right">Remote · Hybrid · Worldwide</span></li>
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Leadership */}
      <Reveal className="mt-20">
        <h3 className="mb-6">Leadership</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {LEADERSHIP.map((l) => (
            <div key={l.role + l.org} className="surface lift p-5">
              <p className="text-sm text-foreground">{l.role}</p>
              <p className="text-mono text-xs text-muted-foreground mt-0.5">{l.org}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {l.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
