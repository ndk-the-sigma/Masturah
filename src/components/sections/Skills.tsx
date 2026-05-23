import { Section, SectionHeader, Reveal } from "./Section";
import { SKILLS } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader index="06" kicker="Skills" title="What I work with across security, forensics, law, and code." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <div className="surface lift h-full p-6">
              <p className="text-mono text-xs text-muted-foreground mb-3">0{i + 1}</p>
              <h4 className="mb-4">{g.group}</h4>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-sm text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
