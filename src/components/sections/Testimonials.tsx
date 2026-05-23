import { Section, SectionHeader, Reveal } from "./Section";
import { TESTIMONIALS } from "@/lib/portfolio-data";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader index="08" kicker="Testimonials" title="What collaborators and mentees say." />
      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <figure className="surface lift p-6 h-full flex flex-col justify-between gap-6">
              <blockquote className="text-lg leading-relaxed text-foreground">
                <span className="text-mono text-primary mr-1">“</span>
                {t.quote}
                <span className="text-mono text-primary ml-1">”</span>
              </blockquote>
              <figcaption className="border-t border-border pt-4">
                <p className="text-foreground">{t.name}</p>
                <p className="text-mono text-xs text-muted-foreground mt-1">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
