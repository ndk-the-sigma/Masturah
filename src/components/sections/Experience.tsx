import { Section, SectionHeader, Reveal } from "./Section";
import { EXPERIENCE } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader index="04" kicker="Experience" title="Roles across security, law, and writing." />
      <div className="grid gap-4 md:grid-cols-2">
        {EXPERIENCE.map((x, i) => (
          <Reveal key={x.role + x.org} delay={i * 0.04}>
            <div className="surface lift p-5 h-full">
              <p className="text-sm text-foreground">{x.role}</p>
              <p className="text-mono text-xs text-muted-foreground mt-0.5">{x.org}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
