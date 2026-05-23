import { Section, SectionHeader, Reveal } from "./Section";
import { CERTIFICATIONS } from "@/lib/portfolio-data";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader index="05" kicker="Certifications" title="Verified credentials and training." />
      <div className="grid gap-4 md:grid-cols-2">
        {CERTIFICATIONS.map((c, i) => {
          const hasLink = !!c.link;
          const Tag: any = hasLink ? "a" : "div";
          return (
            <Reveal key={c.name} delay={i * 0.05}>
              <Tag
                {...(hasLink
                  ? { href: c.link, target: "_blank", rel: "noreferrer" }
                  : {})}
                className={`surface lift p-5 flex items-start justify-between gap-4 group transition-colors ${
                  hasLink ? "hover:border-primary/60" : "cursor-default"
                }`}
              >
                <div>
                  <p className="text-mono text-xs text-muted-foreground">cert.0{i + 1}</p>
                  <p className={`mt-1 text-foreground transition-colors ${hasLink ? "group-hover:text-primary" : ""}`}>
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.issuer}</p>
                  {hasLink && (
                    <p className="text-mono text-[11px] text-muted-foreground/80 mt-2">View credential ↗</p>
                  )}
                </div>
                <span className="text-mono text-xs text-muted-foreground">{c.year}</span>
              </Tag>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
