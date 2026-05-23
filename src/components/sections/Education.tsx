import { Section, SectionHeader, Reveal } from "./Section";
import { EDUCATION } from "@/lib/portfolio-data";

export function Education() {
  return (
    <Section id="education">
      <SectionHeader index="03" kicker="Education" title="Where the law meets the lab." />
      <ol className="space-y-4">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.05}>
            <li className="surface lift p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-mono text-xs text-muted-foreground">0{i + 1}</p>
                  <h4 className="mt-1">{e.title}</h4>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                </div>
                <span className="text-mono text-xs text-muted-foreground">{e.period}</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {e.notes.map((n) => (
                  <li key={n} className="pl-4 relative before:absolute before:left-0 before:top-2.5 before:h-px before:w-2 before:bg-border">{n}</li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
